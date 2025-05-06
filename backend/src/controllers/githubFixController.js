import prisma from "../config/db.js";
import { Octokit } from "octokit";
import fixCode from "../utils/aiFixCode.js"; // ✅ Use AI fix utility


export const generateFixedCode = async (req, res) => {
  const { owner, repo, commitSha, filePath } = req.params;
  const userId = req.user?.id;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.githubAccessToken) {
      return res.status(401).json({ success: false, message: "GitHub token missing" });
    }

    // Find the matching analysis
    const existingAnalysis = await prisma.analysis.findFirst({
      where: {
        file: { filename: filePath },
        commitHash: commitSha,
        githubRepo: {
          repoName: repo,
          userId: userId,
        },
      },
    });

    if (!existingAnalysis) {
      return res.status(404).json({ success: false, message: "Analysis not found" });
    }

    // ✅ Return existing codes if they already exist
    if (existingAnalysis.originalCode && existingAnalysis.fixedCode) {
      return res.status(200).json({
        success: true,
        message: "AI-fixed code fetched from database",
        original: existingAnalysis.originalCode,
        fixed: existingAnalysis.fixedCode,
      });
    }

    const octokit = new Octokit({ auth: user.githubAccessToken });

    const { data: fileContentData } = await octokit.request(
      `GET /repos/${owner}/${repo}/contents/${filePath}?ref=${commitSha}`
    );

    const content = Buffer.from(fileContentData.content, "base64").toString("utf8");

    const analysisResult = existingAnalysis.result || "No analysis available.";

    const fixedCode = await fixCode(content, filePath, analysisResult);

    if (!fixedCode) {
      return res.status(400).json({
        success: false,
        message: "AI did not return fixed code.",
      });
    }

    // Store original and fixed code only if they weren't stored before
    await prisma.analysis.update({
      where: { id: existingAnalysis.id },
      data: {
        originalCode: content,
        fixedCode: fixedCode,
      },
    });

    return res.status(200).json({
      success: true,
      message: "AI-fixed code generated and saved successfully",
      original: content,
      fixed: fixedCode,
    });
  } catch (error) {
    console.error("❌ generateFixedCode Error:", error);
    return res.status(500).json({ success: false, message: "Failed to generate fixed code" });
  }
};



export const commitFixedCode = async (req, res) => {
  try {
    const { owner, repo, filePath, fixedCode, githubRepoId, fixedErrorCount } = req.body;
    const user = req.user;

    console.log('📥 Incoming commit request:', { owner, repo, filePath });

    if (!owner || !repo || !filePath || !fixedCode || !githubRepoId || typeof fixedErrorCount !== "number") {
      console.error('❌ Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Missing required parameters',
      });
    }

    const octokit = new Octokit({ auth: user.accessToken });

    // Step 1: Get file SHA
    const { data: fileData } = await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path: filePath,
      }
    );

    const fileSha = fileData.sha;
    const encodedContent = Buffer.from(fixedCode).toString('base64');

    // Step 2: Commit the fixed code
    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: filePath,
      message: `AI fix applied via IntelliCodeAI: ${filePath}`,
      content: encodedContent,
      sha: fileSha,
    });

    // Step 3: Decrease error count in the database
    // await prisma.githubRepo.update({
    //   where: { id: githubRepoId },
    //   data: {
    //     errorCount: {
    //       decrement: fixedErrorCount, // ✅ Decrease the error count
    //     },
    //   },
    // });

    console.log('🛠️ Updating error count in DB:', {
      githubRepoId,
      fixedErrorCount,
    });
    
    const repos = await prisma.githubRepo.findUnique({
      where: { id: githubRepoId },
      select: { errorCount: true },
    });
    
    const decrementAmount = Math.min(fixedErrorCount, repos.errorCount);
    
    const updatedRepo = await prisma.githubRepo.update({
      where: { id: githubRepoId },
      data: {
        errorCount: {
          decrement: decrementAmount,
        },
      },
    });

    // // Log snapshot
    // await prisma.repoErrorHistory.create({
    //   data: {
    //     repoId: updatedRepo.id,
    //     errorCount: updatedRepo.errorCount,
    //   },
    // })
    
    console.log("✅ Safe decrement:", {
      attempted: fixedErrorCount,
      actual: decrementAmount,
      before: repos.errorCount,
      after: updatedRepo.errorCount,
    });
    
    
    console.log('✅ Updated repo data:', updatedRepo);
    

    return res.status(200).json({
      success: true,
      message: 'AI fixed code committed successfully and error count updated!',
    });
  } catch (error) {
    console.error('❌ Error committing fixed code:', error);
    return res.status(500).json({
      success: false,
      message: 'Commit failed',
      error: error.message || 'Something went wrong',
    });
  }
};

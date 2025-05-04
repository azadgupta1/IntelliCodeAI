// import prisma from "../config/db.js";
// import { Octokit } from "octokit";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Gemini setup
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// export const generateFixedCode = async (req, res) => {
//   const { owner, repo, commitSha, filePath } = req.params;
//   const userId = req.user?.id;

//   try {
//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     if (!user?.githubAccessToken) {
//       return res.status(401).json({ success: false, message: "GitHub token missing" });
//     }

//     const octokit = new Octokit({ auth: user.githubAccessToken });

//     // Fetch file content
//     const { data: fileContentData } = await octokit.request(
//       `GET /repos/${owner}/${repo}/contents/${filePath}?ref=${commitSha}`
//     );

//     const content = Buffer.from(fileContentData.content, "base64").toString("utf8");

//     // Prepare prompt
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     const prompt = `
// You are an expert software engineer. Fix the following code by resolving bugs, optimizing performance, and applying best practices. Return only the fixed code.

// Original File (${filePath}):
// \`\`\`
// ${content}
// \`\`\`

// Respond with **only** the improved code inside one code block.
//     `;

//     const response = await model.generateContent(prompt);
//     const fixedContent = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

//     const cleanCode = fixedContent.replace(/```(.*?)\n?/, "").replace(/```$/, "").trim();

//     res.status(200).json({
//       success: true,
//       message: "AI-fixed code generated successfully",
//       original: content,
//       fixed: cleanCode,
//     });
//   } catch (error) {
//     console.error("❌ generateFixedCode Error:", error);
//     res.status(500).json({ success: false, message: "Failed to generate fixed code" });
//   }
// };


// import analyzeCode from "../utils/aiAnalysis.js";
// import fetchFileFromGitHub from "../utils/github/fetchFileFromGithub.js";

// export const commitFixedCode = async (req, res) => {
//   const { owner, repo, filePath, commitSha } = req.body;
//   const user = req.user;

//   try {
//     const octokit = new Octokit({ auth: user.githubAccessToken });

//     // Step 1: Get file content
//     const { content, sha: oldSha } = await fetchFileFromGitHub(owner, repo, filePath, commitSha, user.githubAccessToken);
//     if (!content) return res.status(404).json({ success: false, message: "File not found in repo." });

//     // Step 2: Get AI-fixed code
//     const analysis = await analyzeCode(content, filePath);
//     const fixedCode = analysis.fixed || analysis.improved || "";

//     if (!fixedCode) return res.status(400).json({ success: false, message: "AI did not return fixed code." });

//     // Step 3: Commit fixed code to GitHub
//     const commitMessage = `AI fix applied via IntelliCodeAI: ${filePath}`;
//     await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
//       owner,
//       repo,
//       path: decodeURIComponent(filePath),
//       message: commitMessage,
//       content: Buffer.from(fixedCode).toString('base64'),
//       sha: oldSha,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Fixed code committed successfully to GitHub",
//     });
//   } catch (err) {
//     console.error("❌ Error committing fixed code:", err);
//     res.status(500).json({ success: false, message: "Commit failed", error: err.message });
//   }
// };


import prisma from "../config/db.js";
import { Octokit } from "octokit";
import fixCode from "../utils/aiFixCode.js"; // ✅ Use AI fix utility


// ✅ Step 1: Generate AI-fixed code (without committing)
// export const generateFixedCode = async (req, res) => {
//   const { owner, repo, commitSha, filePath } = req.params;
//   const userId = req.user?.id;

//   try {
//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     if (!user?.githubAccessToken) {
//       return res.status(401).json({ success: false, message: "GitHub token missing" });
//     }

//     const octokit = new Octokit({ auth: user.githubAccessToken });

//     const { data: fileContentData } = await octokit.request(
//       `GET /repos/${owner}/${repo}/contents/${filePath}?ref=${commitSha}`
//     );

//     const content = Buffer.from(fileContentData.content, "base64").toString("utf8");

//     const fixedCode = await fixCode(content, filePath);

//     if (!fixedCode) {
//       return res.status(400).json({
//         success: false,
//         message: "AI did not return fixed code.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "AI-fixed code generated successfully",
//       original: content,
//       fixed: fixedCode,
//     });
//   } catch (error) {
//     console.error("❌ generateFixedCode Error:", error);
//     return res.status(500).json({ success: false, message: "Failed to generate fixed code" });
//   }
// };

// export const generateFixedCode = async (req, res) => {
//   const { owner, repo, commitSha, filePath } = req.params;
//   const userId = req.user?.id;

//   try {
//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     if (!user?.githubAccessToken) {
//       return res.status(401).json({ success: false, message: "GitHub token missing" });
//     }

//     const octokit = new Octokit({ auth: user.githubAccessToken });

//     const { data: fileContentData } = await octokit.request(
//       `GET /repos/${owner}/${repo}/contents/${filePath}?ref=${commitSha}`
//     );

//     const content = Buffer.from(fileContentData.content, "base64").toString("utf8");

//     // 🟡 Fetch corresponding analysis result from DB
//     const analysis = await prisma.analysis.findFirst({
//       where: {
//         file: {
//           filename: filePath,
//         },
//         commitHash: commitSha,
//         githubRepo: {
//           repoName: repo,
//           userId: userId,
//         },
//       },
//       select: {
//         result: true,
//       },
//     });

//     const analysisResult = analysis?.result || "No analysis available.";

//     console.log(analysisResult);


//     console.log("IT is WORKing");

//     // ✅ Pass analysisResult to fixCode
//     const fixedCode = await fixCode(content, filePath, analysisResult);

//     if (!fixedCode) {
//       return res.status(400).json({
//         success: false,
//         message: "AI did not return fixed code.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "AI-fixed code generated successfully",
//       original: content,
//       fixed: fixedCode,
//     });
//   } catch (error) {
//     console.error("❌ generateFixedCode Error:", error);
//     return res.status(500).json({ success: false, message: "Failed to generate fixed code" });
//   }
// };


// export const generateFixedCode = async (req, res) => {
//   const { owner, repo, commitSha, filePath } = req.params;
//   const userId = req.user?.id;

//   try {
//     const user = await prisma.user.findUnique({ where: { id: userId } });

//     if (!user?.githubAccessToken) {
//       return res.status(401).json({ success: false, message: "GitHub token missing" });
//     }

//     const octokit = new Octokit({ auth: user.githubAccessToken });

//     const { data: fileContentData } = await octokit.request(
//       `GET /repos/${owner}/${repo}/contents/${filePath}?ref=${commitSha}`
//     );

//     const content = Buffer.from(fileContentData.content, "base64").toString("utf8");

//     // Fetch the corresponding analysis record
//     const existingAnalysis = await prisma.analysis.findFirst({
//       where: {
//         file: { filename: filePath },
//         commitHash: commitSha,
//         githubRepo: {
//           repoName: repo,
//           userId: userId,
//         },
//       },
//     });

//     if (!existingAnalysis) {
//       return res.status(404).json({ success: false, message: "Analysis not found" });
//     }

//     const analysisResult = existingAnalysis.result || "No analysis available.";

//     const fixedCode = await fixCode(content, filePath, analysisResult);

//     if (!fixedCode) {
//       return res.status(400).json({
//         success: false,
//         message: "AI did not return fixed code.",
//       });
//     }

//     // Update the analysis record with original and fixed code
//     await prisma.analysis.update({
//       where: { id: existingAnalysis.id },
//       data: {
//         originalCode: content,
//         fixedCode: fixedCode,
//       },
//     });

//     return res.status(200).json({
//       success: true,
//       message: "AI-fixed code generated and saved successfully",
//       original: content,
//       fixed: fixedCode,
//     });
//   } catch (error) {
//     console.error("❌ generateFixedCode Error:", error);
//     return res.status(500).json({ success: false, message: "Failed to generate fixed code" });
//   }
// };



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







// export const commitFixedCode = async (req, res) => {
//   try {
//     const { owner, repo, filePath, fixedCode } = req.body;
//     const user = req.user;

//     console.log('📥 Incoming commit request:', { owner, repo, filePath });

//     if (!owner || !repo || !filePath || !fixedCode) {
//       console.error('❌ Missing required fields');
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required parameters',
//       });
//     }

//     const octokit = new Octokit({ auth: user.accessToken });

//     // Step 1: Get the file SHA from GitHub
//     const { data: fileData } = await octokit.request(
//       'GET /repos/{owner}/{repo}/contents/{path}',
//       {
//         owner,
//         repo,
//         path: filePath,
//       }
//     );

//     console.log('🔍 Existing File Data:', fileData);

//     const fileSha = fileData.sha;

//     // Step 2: Encode fixed code to base64
//     const encodedContent = Buffer.from(fixedCode).toString('base64');

//     // Step 3: Commit the fixed code to GitHub
//     const response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
//       owner,
//       repo,
//       path: filePath,
//       message: `AI fix applied via IntelliCodeAI: ${filePath}`,
//       content: encodedContent,
//       sha: fileSha,
//     });

//     console.log('✅ Commit Response:', response.status);

//     return res.status(200).json({
//       success: true,
//       message: 'AI fixed code committed successfully!',
//     });
//   } catch (error) {
//     console.error('❌ Error committing fixed code:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Commit failed',
//       error: error.message || 'Something went wrong',
//     });
//   }
// };


// import { prisma } from "../prisma/client.js"; // adjust if your path is different 

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

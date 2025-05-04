// import express from "express";
// import axios from "axios";
// import prisma from "../config/db.js";
// import analyzeCode from "../utils/aiAnalysis.js"; // Your AI analysis function


// export const handleGitHubWebhook = async (req, res) => {
//   try {
//     const event = req.headers["x-github-event"];
//     if (event !== "push") return res.status(200).send("Event ignored");

//     const { repository, head_commit, commits } = req.body;

//     const commitMessage = head_commit.message;
//       if (commitMessage && commitMessage.includes("IntelliCodeAI")) {
//         console.log("🤖 Skipping analysis for AI-generated commit:", commitMessage);
//         return res.status(200).send("AI commit ignored");
//       }
      
//     if (!repository || !head_commit) {
//       return res.status(400).json({ message: "Invalid webhook payload" });
//     }

//     const repoName = repository.name;
//     const commitSha = head_commit.id;
//     const owner = repository.owner.login;
//     const changedFiles = commits.flatMap((commit) => [...commit.added, ...commit.modified]);

//     console.log(`🔄 Processing commit ${commitSha} in ${owner}/${repoName}...`);
//     console.log(`👤 Repository Owner: ${owner} (GitHub ID: ${repository.owner.id})`);

//     // Fetch the repository from the database
//     const repo = await prisma.githubRepo.findFirst({
//       where: { repoName, ownerName: owner, autoAnalyze: true },
//     });

//     console.log("🔍 Fetched Repo from DB:", repo);
//     if (!repo) {
//       console.log(`🚫 Auto-analysis is disabled for ${owner}/${repoName}, skipping.`);
//       return res.status(200).send("Auto-analysis is disabled");
//     }

//     // Find the user in the database
//     const dbUser = await prisma.user.findFirst({
//       where: { githubId: repository.owner.id.toString() },
//     });

//     if (!dbUser) {
//       console.log("❌ User not found in DB, skipping...");
//       return res.status(404).json({ message: "User not found" });
//     }

//     console.log(`👤 User found in DB: ${dbUser.username} (ID: ${dbUser.id}, GitHub ID: ${dbUser.githubId})`);

//     const githubToken = dbUser.githubAccessToken;
//     if (!githubToken) {
//       console.log("❌ User's GitHub token is missing.");
//       return res.status(401).json({ message: "GitHub token missing" });
//     }

//     // Process changed files
//     for (const filePath of changedFiles) {
//       const fileUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}?ref=${commitSha}`;
//       console.log(`📂 Fetching file from: ${fileUrl}`);

//       try {
//         // Fetch the file content from GitHub
//         const fileResponse = await axios.get(fileUrl, {
//           headers: {
//             Authorization: `Bearer ${githubToken}`,
//             Accept: "application/vnd.github.v3+json",
//           },
//         });

//         if (!fileResponse.data || !fileResponse.data.content) {
//           console.error(`❌ Failed to fetch content for ${filePath}:`, fileResponse.data);
//           continue;
//         }

//         const fileContent = Buffer.from(fileResponse.data.content, "base64").toString("utf-8");

//         if (!fileContent.trim()) {
//           console.error(`❌ File content is empty for: ${filePath}`);
//           continue;
//         }

//         console.log(`✅ Successfully fetched content for: ${filePath}`);

//         // Run AI analysis
//         console.log(`🔍 Analyzing file: ${filePath}`);
//         const analysisResult = await analyzeCode(fileContent);
//         console.log(`🔄 AI API Response:`, analysisResult);

//         const numErrors = analysisResult.errors?.length || 0;
//         const numSuggestions = analysisResult.suggestions?.length || 0;
//         const numOptimizations = analysisResult.optimizations?.length || 0;

//         console.log("Errors COUNT IS ------------------", numErrors);
//         console.log("Suggestion COUNT IS ------------------", numSuggestions);
//         console.log("Optimization COUNT IS -----------", numOptimizations);


//         if (numErrors > 0) {
//           console.log(`➕ Adding ${numErrors} errors to repo: ${repo.repoName}`);

//           // Update the errorCount in the repo
//           await prisma.githubRepo.update({
//             where: { id: repo.id },
//             data: {
//               errorCount: {
//                 increment: numErrors, // 🆕 Increment errorCount
//               },
//             },
//           });

//           // Log snapshot
//           await prisma.repoErrorHistory.create({
//             data: {
//               repoId: updatedRepo.id,
//               errorCount: updatedRepo.errorCount,
//             },
//           })
//         }

//         // Ensure file exists in the database and get fileId
//         const dbFile = await prisma.file.upsert({
//           where: { fileUrl },
//           update: { filename: filePath, uploadedAt: new Date() },
//           create: { userId: dbUser.id, filename: filePath, fileUrl, uploadedAt: new Date() },
//         });

//         console.log(`✅ File entry ensured in DB for: ${filePath}, fileId: ${dbFile.id}`);

//         // Store analysis in database with githubRepoId
//         const analysisEntry = await prisma.analysis.create({
//           data: {
//             fileId: dbFile.id,
//             userId: dbUser.id,
//             commitHash: commitSha,
//             result: analysisResult,
//             githubRepoId: repo.id, // ✅ Storing repo's GitHub ID
//             errorCnt: numErrors,
//             suggestionCnt: numSuggestions,
//             optimizationCnt: numOptimizations,
//           },
//         });

//         await prisma.notification.create({
//           data: {
//             userId: dbUser.id,
//             message: `Analysis completed for ${filePath} in ${repoName}`,
//           },
//         });

//         console.log(`✅ Analysis stored in DB for ${filePath}, analysisId: ${analysisEntry.id}, repoId: ${repo.id}`);
//       } catch (error) {
//         console.error(`❌ Failed to analyze ${filePath}:`, error.message);

//         if (error.response?.status === 403) {
//           console.error("⚠️ GitHub API rate limit exceeded. Try again later.");
//         }
//       }
//     }

//     res.status(200).json({ message: "Commit processed successfully" });
//   } catch (error) {
//     console.error("❌ Webhook processing error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };



import express from "express";
import axios from "axios";
import prisma from "../config/db.js";
import analyzeCode from "../utils/aiAnalysis.js";

export const handleGitHubWebhook = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    if (event !== "push") return res.status(200).send("Event ignored");

    const { repository, head_commit, commits } = req.body;

    const commitMessage = head_commit.message;
    if (commitMessage && commitMessage.includes("IntelliCodeAI")) {
      console.log("🤖 Skipping analysis for AI-generated commit:", commitMessage);
      return res.status(200).send("AI commit ignored");
    }

    if (!repository || !head_commit) {
      return res.status(400).json({ message: "Invalid webhook payload" });
    }

    const repoName = repository.name;
    const commitSha = head_commit.id;
    const owner = repository.owner.login;
    const changedFiles = commits.flatMap((commit) => [...commit.added, ...commit.modified]);

    console.log(`🔄 Processing commit ${commitSha} in ${owner}/${repoName}...`);
    console.log(`👤 Repository Owner: ${owner} (GitHub ID: ${repository.owner.id})`);

    const repo = await prisma.githubRepo.findFirst({
      where: { repoName, ownerName: owner, autoAnalyze: true },
    });

    console.log("🔍 Fetched Repo from DB:", repo);
    if (!repo) {
      console.log(`🚫 Auto-analysis is disabled for ${owner}/${repoName}, skipping.`);
      return res.status(200).send("Auto-analysis is disabled");
    }

    const dbUser = await prisma.user.findFirst({
      where: { githubId: repository.owner.id.toString() },
    });

    if (!dbUser) {
      console.log("❌ User not found in DB, skipping...");
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`👤 User found in DB: ${dbUser.username} (ID: ${dbUser.id}, GitHub ID: ${dbUser.githubId})`);

    const githubToken = dbUser.githubAccessToken;
    if (!githubToken) {
      console.log("❌ User's GitHub token is missing.");
      return res.status(401).json({ message: "GitHub token missing" });
    }

    for (const filePath of changedFiles) {
      const fileUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}?ref=${commitSha}`;
      console.log(`📂 Fetching file from: ${fileUrl}`);

      try {
        const fileResponse = await axios.get(fileUrl, {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        if (!fileResponse.data || !fileResponse.data.content) {
          console.error(`❌ Failed to fetch content for ${filePath}:`, fileResponse.data);
          continue;
        }

        const fileContent = Buffer.from(fileResponse.data.content, "base64").toString("utf-8");

        if (!fileContent.trim()) {
          console.error(`❌ File content is empty for: ${filePath}`);
          continue;
        }

        console.log(`✅ Successfully fetched content for: ${filePath}`);

        console.log(`🔍 Analyzing file: ${filePath}`);
        const analysisResult = await analyzeCode(fileContent);
        console.log("🔄 AI API Response:", analysisResult);

        const numErrors = analysisResult.errors?.length || 0;
        const numSuggestions = analysisResult.suggestions?.length || 0;
        const numOptimizations = analysisResult.optimizations?.length || 0;

        console.log("Errors COUNT IS ------------------", numErrors);
        console.log("Suggestion COUNT IS ------------------", numSuggestions);
        console.log("Optimization COUNT IS -----------", numOptimizations);

        let updatedRepo = repo;
        if (numErrors > 0) {
          console.log(`➕ Adding ${numErrors} errors to repo: ${repo.repoName}`);

          updatedRepo = await prisma.githubRepo.update({
            where: { id: repo.id },
            data: {
              errorCount: {
                increment: numErrors,
              },
            },
          });

        //   await prisma.repoErrorHistory.create({
        //     data: {
        //       repoId: updatedRepo.id,
        //       errorCount: updatedRepo.errorCount,
        //     },
        //   });
        }

        const dbFile = await prisma.file.upsert({
          where: { fileUrl },
          update: { filename: filePath, uploadedAt: new Date() },
          create: { userId: dbUser.id, filename: filePath, fileUrl, uploadedAt: new Date() },
        });

        console.log(`✅ File entry ensured in DB for: ${filePath}, fileId: ${dbFile.id}`);

        const analysisEntry = await prisma.analysis.create({
          data: {
            fileId: dbFile.id,
            userId: dbUser.id,
            commitHash: commitSha,
            result: analysisResult,
            githubRepoId: repo.id,
            errorCnt: numErrors,
            suggestionCnt: numSuggestions,
            optimizationCnt: numOptimizations,
          },
        });

        await prisma.notification.create({
          data: {
            userId: dbUser.id,
            message: `Analysis completed for ${filePath} in ${repoName}`,
          },
        });

        console.log(`✅ Analysis stored in DB for ${filePath}, analysisId: ${analysisEntry.id}, repoId: ${repo.id}`);
      } catch (error) {
        console.error(`❌ Failed to analyze ${filePath}:`, error.message);

        if (error.response?.status === 403) {
          console.error("⚠️ GitHub API rate limit exceeded. Try again later.");
        }
      }
    }

    res.status(200).json({ message: "Commit processed successfully" });
  } catch (error) {
    console.error("❌ Webhook processing error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};




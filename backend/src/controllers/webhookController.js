// // import prisma from "../config/db.js";
// // import { analyzeGithubFile } from "./githubAnalysisController.js";

// // export const handleGitHubWebhook = async (req, res) => {
// //   try {
// //     const eventType = req.headers["x-github-event"]; // Get GitHub event type
// //     const payload = req.body;

// //     if (eventType !== "push") {
// //       return res.status(200).json({ success: true, message: "Event ignored" });
// //     }

// //     const { repository, head_commit, pusher } = payload;
// //     if (!head_commit || !repository) {
// //       return res.status(400).json({ success: false, message: "Invalid payload" });
// //     }

// //     const repoName = repository.full_name;
// //     const commitSha = head_commit.id;
// //     const files = head_commit.modified.concat(head_commit.added); // Modified or new files

// //     // Filter only code files (adjust as needed)
// //     const codeFiles = files.filter(file => file.endsWith(".js") || file.endsWith(".py") || file.endsWith(".java"));

// //     if (codeFiles.length === 0) {
// //       return res.status(200).json({ success: true, message: "No code files to analyze" });
// //     }

// //     console.log(`Analyzing ${codeFiles.length} files from ${repoName}`);

// //     // Store repo details in the database
// //     const user = await prisma.user.findFirst({ where: { username: pusher.name } });
// //     if (!user) {
// //       return res.status(404).json({ success: false, message: "User not found" });
// //     }

// //     let repoRecord = await prisma.githubRepo.findFirst({
// //       where: { repoName, userId: user.id },
// //     });

// //     if (!repoRecord) {
// //       repoRecord = await prisma.githubRepo.create({
// //         data: {
// //           userId: user.id,
// //           repoName,
// //           repoUrl: repository.html_url,
// //         },
// //       });
// //     }

// //     // Analyze each file
// //     for (const filePath of codeFiles) {
// //       await analyzeGithubFile({
// //         owner: repository.owner.login,
// //         repo: repository.name,
// //         commitSha,
// //         filePath,
// //         userId: user.id,
// //       });
// //     }

// //     res.json({ success: true, message: "Analysis triggered" });
// //   } catch (error) {
// //     console.error("GitHub Webhook Error:", error);
// //     res.status(500).json({ success: false, message: "Webhook processing failed" });
// //   }
// // };


// // src/controllers/webhookController.js
// // import prisma from "../config/db.js";
// // import { analyzeGithubFile } from "./githubAnalysisController.js";

// // export const handleGitHubWebhook = async (req, res) => {
// //   try {
// //     const eventType = req.headers["x-github-event"];
// //     const payload = req.body;

// //     if (eventType !== "push") {
// //       return res.status(200).json({ success: true, message: "Event ignored" });
// //     }

// //     const { repository, head_commit, pusher } = payload;
// //     if (!head_commit || !repository) {
// //       return res.status(400).json({ success: false, message: "Invalid payload" });
// //     }

// //     const repoName = repository.full_name;
// //     const commitSha = head_commit.id;
// //     const files = [...(head_commit.modified || []), ...(head_commit.added || [])]; // Ensure arrays exist
// //     const codeFiles = files.filter(file => file.endsWith(".js") || file.endsWith(".py") || file.endsWith(".java"));

// //     if (codeFiles.length === 0) {
// //       return res.status(200).json({ success: true, message: "No code files to analyze" });
// //     }

// //     console.log(`Analyzing ${codeFiles.length} files from ${repoName}`);

// //     // Find user by GitHub username
// //     const user = await prisma.user.findFirst({ where: { username: pusher.name } });
// //     if (!user) {
// //       return res.status(404).json({ success: false, message: "User not found" });
// //     }

// //     // Upsert the GitHub repository record
// //     let repoRecord = await prisma.githubRepo.upsert({
// //       where: { repoName_userId: { repoName, userId: user.id } }, // ✅ Correct unique composite key
// //       update: {},
// //       create: { userId: user.id, repoName, repoUrl: repository.html_url },
// //     });
    

// //     // Analyze each file
// //     for (const filePath of codeFiles) {
// //       await analyzeGithubFile({
// //         owner: repository.owner.login,
// //         repo: repository.name,
// //         commitSha,
// //         filePath,
// //         userId: user.id,
// //       });
// //     }

// //     res.json({ success: true, message: "Analysis triggered successfully" });
// //   } catch (error) {
// //     console.error("GitHub Webhook Error:", error);
// //     res.status(500).json({ success: false, message: "Webhook processing failed", error: error.message });
// //   }
// // };





// import prisma from "../config/db.js";
// import { analyzeGithubFile } from "./githubAnalysisController.js";

// export const handleGitHubWebhook = async (req, res) => {
//   try {
//     const eventType = req.headers["x-github-event"];
//     const payload = req.body;

//     if (eventType !== "push") {
//       return res.status(200).json({ success: true, message: "Event ignored" });
//     }

//     const { repository, head_commit, pusher } = payload;
//     if (!head_commit || !repository) {
//       return res.status(400).json({ success: false, message: "Invalid payload" });
//     }

//     const repoName = repository.full_name;
//     const commitSha = head_commit.id;
//     const modifiedFiles = head_commit.modified || [];
//     const addedFiles = head_commit.added || [];
//     const codeFiles = [...modifiedFiles, ...addedFiles].filter(file => 
//       file.endsWith(".js") || file.endsWith(".py") || file.endsWith(".java")
//     );

//     if (codeFiles.length === 0) {
//       return res.status(200).json({ success: true, message: "No code files to analyze" });
//     }

//     console.log(`Analyzing ${codeFiles.length} files from ${repoName}`);

//     // ✅ Fix: Lookup user by email instead of `pusher.name`
//     const user = await prisma.user.findFirst({
//       where: { email: head_commit.author.email },
//     });

//     if (!user || !user.githubAccessToken) {
//       return res.status(404).json({ success: false, message: "User not found or missing GitHub access token" });
//     }

//     // ✅ Ensure GitHub repository exists
//     let repoRecord = await prisma.githubRepo.upsert({
//       where: { repoName_userId: { repoName, userId: user.id } },
//       update: {},
//       create: { userId: user.id, repoName, repoUrl: repository.html_url },
//     });

//     // ✅ Analyze each code file
//     for (const filePath of codeFiles) {
//       await analyzeGithubFile({
//         owner: repository.owner.login,
//         repo: repository.name,
//         commitSha,
//         filePath,
//         userId: user.id,
//       });
//     }

//     res.json({ success: true, message: "Analysis triggered successfully" });
//   } catch (error) {
//     console.error("GitHub Webhook Error:", error);
//     res.status(500).json({ success: false, message: "Webhook processing failed", error: error.message });
//   }
// };












// import express from "express";
// import axios from "axios";
// import prisma from "../config/db.js";
// import analyzeCode from "../utils/aiAnalysis.js"; // Your AI analysis function

// export const handleGitHubWebhook = async (req, res) => {
//   try {
//     const event = req.headers["x-github-event"];
//     if (event !== "push") {
//       return res.status(200).send("Event ignored");
//     }

//     const { repository, head_commit, commits } = req.body;
//     if (!repository || !head_commit) {
//       return res.status(400).json({ message: "Invalid webhook payload" });
//     }

//     const repoName = repository.full_name;
//     const commitSha = head_commit.id;
//     const owner = repository.owner.login;
//     const changedFiles = commits.flatMap(commit => [...commit.added, ...commit.modified]);

//     console.log(`🔄 Processing commit ${commitSha} in ${repoName}...`);

//     // Get the user from the database
//     const dbUser = await prisma.user.findFirst({
//       where: { githubId: repository.owner.id.toString() },
//     });

//     if (!dbUser) {
//       console.log("User not found in DB, skipping...");
//       return res.status(404).json({ message: "User not found" });
//     }

//     const githubToken = dbUser.githubAccessToken;
//     if (!githubToken) {
//       console.log("User's GitHub token missing");
//       return res.status(401).json({ message: "GitHub token missing" });
//     }

//     // Analyze each changed file
//     for (const filePath of changedFiles) {
//       const fileUrl = `https://api.github.com/repos/${owner}/${repository.name}/contents/${filePath}?ref=${commitSha}`;
//       console.log("Fetching file from:", fileUrl);

//       try {
//         // Fetch the file content from GitHub
//         const fileResponse = await axios.get(fileUrl, {
//           headers: { Authorization: `Bearer ${githubToken}` },
//         });

//         if (!fileResponse.data || !fileResponse.data.content) {
//           console.error(`❌ Failed to fetch content for ${filePath}:`, fileResponse.data);
//           continue; // Skip this file and move to the next
//         }

//         const fileContent = Buffer.from(fileResponse.data.content, "base64").toString("utf-8");

//         if (!fileContent.trim()) { // Ensures content is not empty
//           console.error(`❌ File content is empty for: ${filePath}`);
//           continue;
//         }

//         console.log(`✅ Successfully fetched content for: ${filePath}`);

//         // Run AI analysis
//         console.log(`🔍 Analyzing file: ${filePath}`);
//         const analysisResult = await analyzeCode(fileContent);
//         console.log(`🔄 AI API Response:`, analysisResult);

//         // Ensure file exists in the database and get fileId
//         const dbFile = await prisma.file.upsert({
//           where: { fileUrl },
//           update: {
//             filename: filePath,
//             uploadedAt: new Date(),
//           },
//           create: {
//             userId: dbUser.id,
//             filename: filePath,
//             fileUrl,
//             uploadedAt: new Date(),
//           },
//         });

//         console.log(`✅ File entry ensured in DB for: ${filePath}, fileId: ${dbFile.id}`);

//         // Store analysis in database
//         const analysisEntry = await prisma.analysis.create({
//           data: {
//             fileId: dbFile.id, // ✅ Corrected fileId
//             userId: dbUser.id,
//             commitHash: commitSha,
//             result: analysisResult,
//           },
//         });

//         console.log(`✅ Analysis stored in DB for ${filePath}, analysisId: ${analysisEntry.id}`);
//       } catch (error) {
//         console.error(`❌ Failed to analyze ${filePath}:`, error.message);
//       }
//     }

//     res.status(200).json({ message: "Commit processed successfully" });
//   } catch (error) {
//     console.error("Webhook processing error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };


// import express from "express";
// import axios from "axios";
// import prisma from "../config/db.js";
// import analyzeCode from "../utils/aiAnalysis.js"; // Your AI analysis function

// export const handleGitHubWebhook = async (req, res) => {
//   try {
//     const event = req.headers["x-github-event"];
//     if (event !== "push") return res.status(200).send("Event ignored");

//     const { repository, head_commit, commits } = req.body;
//     if (!repository || !head_commit) {
//       return res.status(400).json({ message: "Invalid webhook payload" });
//     }

//     const repoName = repository.full_name;
//     const commitSha = head_commit.id;
//     const owner = repository.owner.login;
//     const changedFiles = commits.flatMap((commit) => [...commit.added, ...commit.modified]);

//     console.log(`🔄 Processing commit ${commitSha} in ${repoName}...`);

//     // Find the repository in the database with auto-analysis enabled
//     const repo = await prisma.githubRepo.findFirst({
//       where: { repoName, autoAnalyze: true },
//     });

//     if (!repo) {
//       console.log(`🚫 Auto-analysis is disabled for ${repoName}, skipping.`);
//       return res.status(200).send("Auto-analysis is disabled");
//     }

//     // Get the user from the database
//     const dbUser = await prisma.user.findFirst({
//       where: { githubId: repository.owner.id.toString() },
//     });

//     if (!dbUser) {
//       console.log("User not found in DB, skipping...");
//       return res.status(404).json({ message: "User not found" });
//     }

//     const githubToken = dbUser.githubAccessToken;
//     if (!githubToken) {
//       console.log("User's GitHub token missing");
//       return res.status(401).json({ message: "GitHub token missing" });
//     }

//     // Analyze each changed file
//     for (const filePath of changedFiles) {
//       const fileUrl = `https://api.github.com/repos/${owner}/${repository.name}/contents/${filePath}?ref=${commitSha}`;
//       console.log("Fetching file from:", fileUrl);

//       try {
//         // Fetch the file content from GitHub
//         const fileResponse = await axios.get(fileUrl, {
//           headers: { Authorization: `Bearer ${githubToken}` },
//         });

//         if (!fileResponse.data || !fileResponse.data.content) {
//           console.error(`❌ Failed to fetch content for ${filePath}:`, fileResponse.data);
//           continue; // Skip this file and move to the next
//         }

//         const fileContent = Buffer.from(fileResponse.data.content, "base64").toString("utf-8");

//         if (!fileContent.trim()) { // Ensures content is not empty
//           console.error(`❌ File content is empty for: ${filePath}`);
//           continue;
//         }

//         console.log(`✅ Successfully fetched content for: ${filePath}`);

//         // Run AI analysis
//         console.log(`🔍 Analyzing file: ${filePath}`);
//         const analysisResult = await analyzeCode(fileContent);
//         console.log(`🔄 AI API Response:`, analysisResult);

//         // Ensure file exists in the database and get fileId
//         const dbFile = await prisma.file.upsert({
//           where: { fileUrl },
//           update: {
//             filename: filePath,
//             uploadedAt: new Date(),
//           },
//           create: {
//             userId: dbUser.id,
//             filename: filePath,
//             fileUrl,
//             uploadedAt: new Date(),
//           },
//         });

//         console.log(`✅ File entry ensured in DB for: ${filePath}, fileId: ${dbFile.id}`);

//         // Store analysis in database
//         const analysisEntry = await prisma.analysis.create({
//           data: {
//             fileId: dbFile.id, // ✅ Corrected fileId
//             userId: dbUser.id,
//             commitHash: commitSha,
//             result: analysisResult,
//           },
//         });

//         console.log(`✅ Analysis stored in DB for ${filePath}, analysisId: ${analysisEntry.id}`);
//       } catch (error) {
//         console.error(`❌ Failed to analyze ${filePath}:`, error.message);
//       }
//     }

//     res.status(200).json({ message: "Commit processed successfully" });
//   } catch (error) {
//     console.error("Webhook processing error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };




import express from "express";
import axios from "axios";
import prisma from "../config/db.js";
import analyzeCode from "../utils/aiAnalysis.js"; // Your AI analysis function

// export const handleGitHubWebhook = async (req, res) => {
//   try {
//     const event = req.headers["x-github-event"];
//     if (event !== "push") return res.status(200).send("Event ignored");

//     const { repository, head_commit, commits } = req.body;
//     if (!repository || !head_commit) {
//       return res.status(400).json({ message: "Invalid webhook payload" });
//     }

//     const repoName = repository.name; // Changed from full_name
//     const commitSha = head_commit.id;
//     const owner = repository.owner.login;
//     const changedFiles = commits.flatMap((commit) => [...commit.added, ...commit.modified]);

//     console.log(`🔄 Processing commit ${commitSha} in ${owner}/${repoName}...`);

//     // Fetch the repository from the database
//     const repo = await prisma.githubRepo.findFirst({
//       where: { repoName, ownerName: owner, autoAnalyze: true },
//     });

//     console.log("🔍 Fetched Repo from DB:", repo);
//     if (repo) {
//       console.log(`AutoAnalyze: ${repo.autoAnalyze} (Type: ${typeof repo.autoAnalyze})`);
//     }

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

//         if (!fileContent.trim()) { // Ensure content is not empty
//           console.error(`❌ File content is empty for: ${filePath}`);
//           continue;
//         }

//         console.log(`✅ Successfully fetched content for: ${filePath}`);

//         // Run AI analysis
//         console.log(`🔍 Analyzing file: ${filePath}`);
//         const analysisResult = await analyzeCode(fileContent);
//         console.log(`🔄 AI API Response:`, analysisResult);

//         // Ensure file exists in the database and get fileId
//         const dbFile = await prisma.file.upsert({
//           where: { fileUrl },
//           update: { filename: filePath, uploadedAt: new Date() },
//           create: { userId: dbUser.id, filename: filePath, fileUrl, uploadedAt: new Date() },
//         });

//         console.log(`✅ File entry ensured in DB for: ${filePath}, fileId: ${dbFile.id}`);

//         // Store analysis in database
//         const analysisEntry = await prisma.analysis.create({
//           data: {
//             fileId: dbFile.id, // ✅ Corrected fileId
//             userId: dbUser.id,
//             commitHash: commitSha,
//             result: analysisResult,
//           },
//         });

//         console.log(`✅ Analysis stored in DB for ${filePath}, analysisId: ${analysisEntry.id}`);
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

//     // update
//   }
// };



export const handleGitHubWebhook = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    if (event !== "push") return res.status(200).send("Event ignored");

    const { repository, head_commit, commits } = req.body;
    if (!repository || !head_commit) {
      return res.status(400).json({ message: "Invalid webhook payload" });
    }

    const repoName = repository.name;
    const commitSha = head_commit.id;
    const owner = repository.owner.login;
    const changedFiles = commits.flatMap((commit) => [...commit.added, ...commit.modified]);

    console.log(`🔄 Processing commit ${commitSha} in ${owner}/${repoName}...`);
    console.log(`👤 Repository Owner: ${owner} (GitHub ID: ${repository.owner.id})`);

    // Fetch the repository from the database
    const repo = await prisma.githubRepo.findFirst({
      where: { repoName, ownerName: owner, autoAnalyze: true },
    });

    console.log("🔍 Fetched Repo from DB:", repo);
    if (!repo) {
      console.log(`🚫 Auto-analysis is disabled for ${owner}/${repoName}, skipping.`);
      return res.status(200).send("Auto-analysis is disabled");
    }

    // Find the user in the database
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

    // Process changed files
    for (const filePath of changedFiles) {
      const fileUrl = `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}?ref=${commitSha}`;
      console.log(`📂 Fetching file from: ${fileUrl}`);

      try {
        // Fetch the file content from GitHub
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

        // Run AI analysis
        console.log(`🔍 Analyzing file: ${filePath}`);
        const analysisResult = await analyzeCode(fileContent);
        console.log(`🔄 AI API Response:`, analysisResult);

        const numErrors = analysisResult.errors?.length || 0;

        if (numErrors > 0) {
          console.log(`➕ Adding ${numErrors} errors to repo: ${repo.repoName}`);

          // Update the errorCount in the repo
          await prisma.githubRepo.update({
            where: { id: repo.id },
            data: {
              errorCount: {
                increment: numErrors, // 🆕 Increment errorCount
              },
            },
          });
        }

        // Ensure file exists in the database and get fileId
        const dbFile = await prisma.file.upsert({
          where: { fileUrl },
          update: { filename: filePath, uploadedAt: new Date() },
          create: { userId: dbUser.id, filename: filePath, fileUrl, uploadedAt: new Date() },
        });

        console.log(`✅ File entry ensured in DB for: ${filePath}, fileId: ${dbFile.id}`);

        // Store analysis in database with githubRepoId
        const analysisEntry = await prisma.analysis.create({
          data: {
            fileId: dbFile.id,
            userId: dbUser.id,
            commitHash: commitSha,
            result: analysisResult,
            githubRepoId: repo.id, // ✅ Storing repo's GitHub ID
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
































// import express from "express";
// import axios from "axios";
// import prisma from "../config/db.js";
// import analyzeCode from "../utils/aiAnalysis.js"; // Your AI analysis function

// export const handleGitHubWebhook = async (req, res) => {
//   try {
//     const event = req.headers["x-github-event"];
//     if (event !== "push") {
//       return res.status(200).send("Event ignored");
//     }

//     const { repository, head_commit, commits } = req.body;
//     if (!repository || !head_commit) {
//       return res.status(400).json({ message: "Invalid webhook payload" });
//     }

//     const repoName = repository.full_name;
//     const commitSha = head_commit.id;
//     const owner = repository.owner.login;
//     const changedFiles = commits.flatMap(commit => [...commit.added, ...commit.modified]);

//     console.log(`🔄 Processing commit ${commitSha} in ${repoName}...`);

//     // Get the user from the database
//     const dbUser = await prisma.user.findFirst({
//       where: { githubId: repository.owner.id.toString() },
//     });

//     if (!dbUser) {
//       console.log("User not found in DB, skipping...");
//       return res.status(404).json({ message: "User not found" });
//     }

//     const githubToken = dbUser.githubAccessToken;
//     if (!githubToken) {
//       console.log("User's GitHub token missing");
//       return res.status(401).json({ message: "GitHub token missing" });
//     }

//     // Analyze each changed file
//     for (const filePath of changedFiles) {
//       const fileUrl = `https://api.github.com/repos/${owner}/${repository.name}/contents/${filePath}?ref=${commitSha}`;
//       console.log("Fetching file from:", fileUrl);


//       try {
//         // const fileResponse = await axios.get(fileUrl, {
//         //   headers: { Authorization: `Bearer ${githubToken}` },
//         // });

//         // const fileContent = Buffer.from(fileResponse.data.content, "base64").toString("utf-8");
//         // console.log(`📄 Analyzing file: ${filePath}`);

        
        

//         const fileResponse = await axios.get(fileUrl, {
//           headers: { Authorization: `Bearer ${githubToken}` },
//         });
        
//         if (!fileResponse.data || !fileResponse.data.content) {
//           console.error(`❌ Failed to fetch content for ${filePath}:`, fileResponse.data);
//           continue; // Skip this file and move to the next
//         }
        
//         const fileContent = Buffer.from(fileResponse.data.content, "base64").toString("utf-8");
//         if (!fileContent) {
//           console.error(`❌ File content is undefined for: ${filePath}`);
//           continue;
//         }

//         console.log(`✅ Successfully fetched content for: ${filePath}`);
        

//         // Run AI analysis
//         const analysisResult = await analyzeCode(fileContent);

//         // Store in database
//         await prisma.file.upsert({
//           where: { fileUrl },
//           update: {
//             filename: filePath,
//             uploadedAt: new Date(),
//           },
//           create: {
//             userId: dbUser.id,
//             filename: filePath,
//             fileUrl,
//             uploadedAt: new Date(),
//           },
//         });

//         await prisma.analysis.create({
//           data: {
//             fileId: dbUser.id,
//             userId: dbUser.id,
//             commitHash: commitSha,
//             result: analysisResult,
//           },
//         });

//         console.log(`✅ Analysis stored for ${filePath}`);
//       } catch (error) {
//         console.error(`❌ Failed to analyze ${filePath}:`, error.message);
//       }
//     }

//     res.status(200).json({ message: "Commit processed successfully" });
//   } catch (error) {
//     console.error("Webhook processing error:", error);
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

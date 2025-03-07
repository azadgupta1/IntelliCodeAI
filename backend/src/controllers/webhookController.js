// import prisma from "../config/db.js";
// import analyzeCode from "../utils/aiAnalysis.js";
// import axios from "axios";

// export const handleGitHubWebhook = async (req, res) => {
//   try {
//     const event = req.headers["x-github-event"];
//     if (event !== "push") {
//       return res.status(400).json({ message: "Unhandled event type" });
//     }

//     const { repository, head_commit } = req.body;
//     if (!repository || !head_commit) {
//       return res.status(400).json({ message: "Invalid payload" });
//     }

//     const { id: commitHash, author } = head_commit;
//     const modifiedFiles = head_commit.modified || [];

//     console.log(`Received commit ${commitHash} from ${repository.full_name}`);

//     // ✅ Fix: Use correct username field from GitHub webhook (`author.username`)
//     const user = await prisma.user.findFirst({ where: { username: author.username } });

//     // ✅ Fix: Check `githubAccessToken` instead of `accessToken`
//     if (!user || !user.githubAccessToken) {
//       console.error("User not found or missing GitHub token:", user);
//       return res.status(401).json({ message: "User GitHub token not found" });
//     }

//     const githubToken = user.githubAccessToken;
//     const analysisResults = [];

//     for (const filePath of modifiedFiles) {
//       try {
//         const encodedFilePath = encodeURIComponent(filePath);
//         const contentsUrl = `https://api.github.com/repos/${repository.full_name}/contents/${encodedFilePath}?ref=${commitHash}`;

//         const response = await axios.get(contentsUrl, {
//           headers: { Authorization: `Bearer ${githubToken}` },
//         });

//         const fileContent = Buffer.from(response.data.content, "base64").toString("utf-8");
//         const analysisResult = await analyzeCode(fileContent);

//         // ✅ Fix: `filePath` field doesn't exist in the `Analysis` model. Use `fileId`.
//         const analysis = await prisma.analysis.create({
//           data: {
//             result: analysisResult,
//             commitHash,
//             userId: user.id,
//             file: { create: { filename: filePath, fileUrl: contentsUrl, userId: user.id } }, // Create associated File
//           },
//         });

//         analysisResults.push(analysis);
//       } catch (error) {
//         console.error(`Error analyzing ${filePath}:`, error.response?.data || error.message);
//       }
//     }

//     res.status(200).json({
//       message: "Webhook processed",
//       commit: commitHash,
//       analyzedFiles: analysisResults,
//     });
//   } catch (error) {
//     console.error("Webhook handling error:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   }
// };

import prisma from "../config/db.js";
import { analyzeGithubFile } from "./githubAnalysisController.js";

export const handleGitHubWebhook = async (req, res) => {
  try {
    const eventType = req.headers["x-github-event"]; // Get GitHub event type
    const payload = req.body;

    if (eventType !== "push") {
      return res.status(200).json({ success: true, message: "Event ignored" });
    }

    const { repository, head_commit, pusher } = payload;
    if (!head_commit || !repository) {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    const repoName = repository.full_name;
    const commitSha = head_commit.id;
    const files = head_commit.modified.concat(head_commit.added); // Modified or new files

    // Filter only code files (adjust as needed)
    const codeFiles = files.filter(file => file.endsWith(".js") || file.endsWith(".py") || file.endsWith(".java"));

    if (codeFiles.length === 0) {
      return res.status(200).json({ success: true, message: "No code files to analyze" });
    }

    console.log(`Analyzing ${codeFiles.length} files from ${repoName}`);

    // Store repo details in the database
    const user = await prisma.user.findFirst({ where: { username: pusher.name } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let repoRecord = await prisma.githubRepo.findFirst({
      where: { repoName, userId: user.id },
    });

    if (!repoRecord) {
      repoRecord = await prisma.githubRepo.create({
        data: {
          userId: user.id,
          repoName,
          repoUrl: repository.html_url,
        },
      });
    }

    // Analyze each file
    for (const filePath of codeFiles) {
      await analyzeGithubFile({
        owner: repository.owner.login,
        repo: repository.name,
        commitSha,
        filePath,
        userId: user.id,
      });
    }

    res.json({ success: true, message: "Analysis triggered" });
  } catch (error) {
    console.error("GitHub Webhook Error:", error);
    res.status(500).json({ success: false, message: "Webhook processing failed" });
  }
};

import prisma from "../config/db.js";
import analyzeCode from "../utils/aiAnalysis.js";
import axios from "axios";

export const handleGitHubWebhook = async (req, res) => {
  try {
    const event = req.headers["x-github-event"];
    if (event !== "push") {
      return res.status(400).json({ message: "Unhandled event type" });
    }

    const { repository, head_commit } = req.body;
    if (!repository || !head_commit) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    const { id: commitHash, author } = head_commit;
    const modifiedFiles = head_commit.modified || [];

    console.log(`Received commit ${commitHash} from ${repository.full_name}`);

    // ✅ Fix: Use correct username field from GitHub webhook (`author.username`)
    const user = await prisma.user.findFirst({ where: { username: author.username } });

    // ✅ Fix: Check `githubAccessToken` instead of `accessToken`
    if (!user || !user.githubAccessToken) {
      console.error("User not found or missing GitHub token:", user);
      return res.status(401).json({ message: "User GitHub token not found" });
    }

    const githubToken = user.githubAccessToken;
    const analysisResults = [];

    for (const filePath of modifiedFiles) {
      try {
        const encodedFilePath = encodeURIComponent(filePath);
        const contentsUrl = `https://api.github.com/repos/${repository.full_name}/contents/${encodedFilePath}?ref=${commitHash}`;

        const response = await axios.get(contentsUrl, {
          headers: { Authorization: `Bearer ${githubToken}` },
        });

        const fileContent = Buffer.from(response.data.content, "base64").toString("utf-8");
        const analysisResult = await analyzeCode(fileContent);

        // ✅ Fix: `filePath` field doesn't exist in the `Analysis` model. Use `fileId`.
        const analysis = await prisma.analysis.create({
          data: {
            result: analysisResult,
            commitHash,
            userId: user.id,
            file: { create: { filename: filePath, fileUrl: contentsUrl, userId: user.id } }, // Create associated File
          },
        });

        analysisResults.push(analysis);
      } catch (error) {
        console.error(`Error analyzing ${filePath}:`, error.response?.data || error.message);
      }
    }

    res.status(200).json({
      message: "Webhook processed",
      commit: commitHash,
      analyzedFiles: analysisResults,
    });
  } catch (error) {
    console.error("Webhook handling error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

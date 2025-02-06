import prisma from "../config/db.js";
import axios from "axios";
import analyzeCode from "../utils/aiAnalysis.js"; // AI Analysis function

export const handleGitHubWebhook = async (req, res) => {
  try {
    const event = req.headers["x-github-event"]; // Check event type
    if (event !== "push") {
      return res.status(200).json({ message: "Event ignored. Only 'push' events are processed." });
    }

    const payload = req.body; // Webhook payload
    const commits = payload.commits || [];

    for (const commit of commits) {
      const { id: commitHash, added, modified } = commit;

      const filesToAnalyze = [...added, ...modified]; // Only analyze new/modified files

      for (const filePath of filesToAnalyze) {
        try {
          const fileContent = await fetchGitHubFileContent(payload.repository, commitHash, filePath);
          const analysisResult = await analyzeCode(fileContent);

          // Save analysis in the database
          await prisma.analysis.create({
            data: {
              filePath,
              result: analysisResult,
              commitHash,
              userId: payload.sender.id, // GitHub user who made the commit
            },
          });
        } catch (err) {
          console.error(`Error analyzing ${filePath}:`, err);
        }
      }
    }

    res.status(200).json({ message: "Webhook received and processed successfully." });
  } catch (error) {
    console.error("Webhook Processing Error:", error);
    res.status(500).json({ message: "Error processing webhook.", error: error.message });
  }
};

// Fetch file content from GitHub
const fetchGitHubFileContent = async (repo, commitSha, filePath) => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repo.full_name}/contents/${filePath}?ref=${commitSha}`, {
      headers: { Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}` },
    });

    return Buffer.from(response.data.content, "base64").toString("utf-8");
  } catch (error) {
    console.error(`Error fetching file content for ${filePath}:`, error);
    throw error;
  }
};

// ✅ Commit AI-fixed code to GitHub
import { Octokit } from "octokit";
import analyzeCode from "../utils/aiAnalysis.js";
import fetchFileFromGitHub from "../utils/github/fetchFileFromGitHub.js";

export const commitFixedCode = async (req, res) => {
  const { owner, repo, filePath, commitSha } = req.body;
  const user = req.user;

  try {
    const octokit = new Octokit({ auth: user.githubAccessToken });

    // Step 1: Get file content from GitHub
    const { content, sha: oldSha } = await fetchFileFromGitHub(owner, repo, filePath, commitSha, user.githubAccessToken);
    if (!content) return res.status(404).json({ success: false, message: "File not found in repo." });

    // Step 2: Get AI-fixed code
    const analysis = await analyzeCode(content, filePath);
    const fixedCode = analysis.fixed || analysis.improved || ""; // Fallbacks

    if (!fixedCode) return res.status(400).json({ success: false, message: "AI did not return fixed code." });

    // Step 3: Commit fixed code
    const commitMessage = `AI fix applied via IntelliCodeAI: ${filePath}`;

    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path: decodeURIComponent(filePath),
      message: commitMessage,
      content: Buffer.from(fixedCode).toString('base64'),
      sha: oldSha,
    });

    return res.status(200).json({
      success: true,
      message: "Fixed code committed successfully to GitHub",
    });
  } catch (err) {
    console.error("❌ Error committing fixed code:", err);
    res.status(500).json({ success: false, message: "Commit failed", error: err.message });
  }
};

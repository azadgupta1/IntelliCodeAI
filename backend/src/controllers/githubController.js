

import axios from "axios";
import prisma from "../config/db.js";
import aiCodeAnalysis from "../utils/aiAnalysis.js"; // Import AI analysis function

import { enableAutoAnalysis } from "../services/githubService.js";


// ✅ Fetch repositories where auto-analysis is enabled
export const getAutoAnalysisRepos = async (req, res) => {
  try {
    const userId = req.user.id; // Get authenticated user

    // Find all repos where auto-analysis is enabled
    const autoAnalysisRepos = await prisma.githubRepo.findMany({
      where: { userId, autoAnalyze: true },
    });

    res.json({ success: true, repositories: autoAnalysisRepos });
  } catch (error) {
    console.error("Error fetching auto-analysis repositories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const getRepoAnalysisHistory = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const userId = req.user.id; // Authenticated user

    console.log(`📌 Fetching analysis for repo: ${repo}, owner: ${owner}, userId: ${userId}`);

    // Find the repo owned by the user
    const githubRepo = await prisma.githubRepo.findFirst({
      where: { ownerName: owner, repoName: repo, userId },
      include: { analyses: { include: { file: true } } }, // ✅ Ensure files are included
    });

    if (!githubRepo) {
      console.warn(`🚫 Repository ${repo} not found or not owned by user ${userId}`);
      return res.status(404).json({ success: false, message: "Repository not found or not owned by user" });
    }

    console.log("✅ Found analysis data:", githubRepo.analyses);
    res.json({ success: true, analyses: githubRepo.analyses });

  } catch (error) {
    console.error("❌ Error fetching repo analysis history:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};






export const getAutoAnalysisStatusController = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch repositories where auto-analysis is enabled
    const repos = await prisma.githubRepo.findMany({
      where: { userId, autoAnalyze: true },
    });

    if (!repos.length) {
      return res.status(404).json({ message: "No repositories with auto-analysis enabled" });
    }

    // Construct status response
    const status = repos.map((repo) => ({
      repoName: repo.repoName,
      lastCommitHash: repo.lastCommitHash || "N/A",
      analysis: [], // No `analyses` relation, so return an empty array for now
    }));

    res.json(status);
  } catch (error) {
    console.error("Error fetching auto-analysis status:", error);
    res.status(500).json({ message: "Failed to fetch auto-analysis status" });
  }
};



export const enableAutoAnalysisController = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieved from authMiddleware
    const { repoName } = req.body;
    const githubToken = req.user.accessToken;

    if (!repoName) {
      return res.status(400).json({ message: "Repository name is required" });
    }

    console.log("🔹 Enabling Auto-Analysis");
    console.log("🔹 User ID:", userId);
    console.log("🔹 Repo Name:", repoName);
    console.log("🔹 Webhook URL:", process.env.WEBHOOK_URL);

    if (!githubToken) {
      console.error("❌ GitHub Token is missing for user:", userId);
      return res.status(401).json({ message: "GitHub authentication required" });
    }

    // Check if the repository exists in the database
    const existingRepo = await prisma.githubRepo.findFirst({
      where: { repoName, userId },
    });

    if (!existingRepo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (existingRepo.autoAnalyze) {
      console.log("✅ Auto-Analysis is already enabled for this repository.");
      return res.status(200).json({ message: "Auto-Analysis is already enabled!" });
    }

    // ✅ Create webhook on GitHub
    const webhookPayload = {
      name: "web",
      active: true,
      events: ["push"],
      config: {
        url: `${process.env.WEBHOOK_URL}/webhooks/github`, // ✅ Ensure WEBHOOK_URL is correct
        content_type: "json",
      },
    };

    console.log("🔹 Creating GitHub Webhook for:", repoName);

    let webhookResponse;
    try {
      webhookResponse = await axios.post(
        `https://api.github.com/repos/${existingRepo.ownerName}/${repoName}/hooks`,
        webhookPayload,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
    } catch (error) {
      console.error("❌ Error creating GitHub webhook:", error.response?.data || error.message);
      return res.status(500).json({ message: "Failed to create webhook", error: error.response?.data || error.message });
    }

    console.log("✅ Webhook created successfully!");
    console.log("🔹 Webhook ID:", webhookResponse.data.id);

    // ✅ Save webhook ID & enable auto-analysis in the database
    await prisma.githubRepo.update({
      where: { id: existingRepo.id },
      data: {
        autoAnalyze: true,
        webhookId: webhookResponse.data.id.toString(), // ✅ Convert to String
      },
    });

    res.status(200).json({ message: "Auto-Analysis enabled successfully!" });
  } catch (error) {
    console.error("❌ Error enabling auto-analysis:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const disableAutoAnalysisController = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieved from authMiddleware
    const { repoName } = req.body;
    const githubToken = req.user.accessToken;

    if (!repoName) {
      return res.status(400).json({ message: "Repository name is required" });
    }

    console.log("🔹 Disabling Auto-Analysis");
    console.log("🔹 User ID:", userId);
    console.log("🔹 Repo Name:", repoName);

    if (!githubToken) {
      console.error("❌ GitHub Token is missing for user:", userId);
      return res.status(401).json({ message: "GitHub authentication required" });
    }

    // Check if the repository exists in the database
    const existingRepo = await prisma.githubRepo.findFirst({
      where: { repoName, userId },
    });

    if (!existingRepo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    if (!existingRepo.autoAnalyze) {
      console.log("✅ Auto-Analysis is already disabled for this repository.");
      return res.status(200).json({ message: "Auto-Analysis is already disabled!" });
    }

    // ✅ Delete webhook from GitHub
    console.log("🔹 Deleting GitHub Webhook for:", repoName);

    try {
      await axios.delete(
        `https://api.github.com/repos/${existingRepo.ownerName}/${repoName}/hooks/${existingRepo.webhookId}`,
        {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );
    } catch (error) {
      console.error("❌ Error deleting GitHub webhook:", error.response?.data || error.message);
      return res.status(500).json({ message: "Failed to delete webhook", error: error.response?.data || error.message });
    }

    console.log("✅ Webhook deleted successfully!");

    // ✅ Update the database to disable auto-analysis
    await prisma.githubRepo.update({
      where: { id: existingRepo.id },
      data: {
        autoAnalyze: false,
        webhookId: null,
      },
    });

    res.status(200).json({ message: "Auto-Analysis disabled successfully!" });
  } catch (error) {
    console.error("❌ Error disabling auto-analysis:", error.response?.data || error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const githubFileAnalysis = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { filePath } = req.body;
    const userId = req.user.id; // Authenticated user ID
    const accessToken = req.user.accessToken;
    const githubId = req.user.githubId; // GitHub user ID

    console.log("\n🔹 Received GitHub File Analysis Request");
    console.log("➡️ User ID:", userId);
    console.log("➡️ GitHub ID:", githubId);
    console.log("➡️ Repo Owner:", owner);
    console.log("➡️ Repo Name:", repo);
    console.log("➡️ File Path:", filePath);

    if (!filePath) {
      console.error("❌ File path is missing in the request.");
      return res.status(400).json({ message: "File path is required." });
    }

    // 🟢 Step 1: Ensure GitHub Repo exists in the database
    let githubRepo;
    try {
      githubRepo = await prisma.githubRepo.findFirst({
        where: { ownerName: owner, repoName: repo, userId },
      });

      if (!githubRepo) {
        console.warn("❗ GitHub Repo NOT found. Creating new entry...");
        githubRepo = await prisma.githubRepo.create({
          data: { ownerName: owner, repoName: repo, userId },
        });
        console.log("✅ GitHub Repo created:", githubRepo);
      } else {
        console.log("✅ GitHub Repo found:", githubRepo);
      }
    } catch (error) {
      console.error("❌ Database error while finding/creating GitHub repo:", error.message);
      return res.status(500).json({
        message: "Database error while handling GitHub repo",
        error: error.message,
      });
    }

    // Debug Log: Check githubRepo.id
    if (!githubRepo || !githubRepo.id) {
      console.error("❌ GitHub Repo ID is missing! Cannot proceed.");
      return res.status(500).json({
        message: "Failed to retrieve GitHub Repo ID",
      });
    }

    const githubRepoId = githubRepo.id;
    console.log("📌 GitHub Repo ID (Stored Correctly):", githubRepoId);

    // 🟢 Step 2: Fetch the latest commit SHA
    let commitSha = "Unknown";
    try {
      console.log("📥 Fetching latest commit SHA...");
      const commitsResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      commitSha = commitsResponse.data[0]?.sha || "Unknown";
      console.log("✅ Latest Commit SHA:", commitSha);
    } catch (error) {
      console.error("❌ Error fetching latest commit SHA:", error.response?.data || error.message);
    }

    // 🟢 Step 3: Fetch the file content
    let fileContent;
    try {
      const rawFileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
      console.log("📄 Fetching file from:", rawFileUrl);
      const fileResponse = await axios.get(rawFileUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      fileContent = fileResponse.data;
      console.log("✅ File fetched successfully.");
    } catch (error) {
      console.error("❌ Error fetching file:", error.response?.data || error.message);
      return res.status(error.response?.status || 500).json({
        message: "Error fetching file from GitHub",
        error: error.response?.data || error.message,
      });
    }

    // 🟢 Step 4: Analyze file content
    console.log("🧠 Running AI Code Analysis...");
    const analysisResult = await aiCodeAnalysis(fileContent, filePath);
    console.log("✅ AI Analysis completed.");

    // Debug Log: Check analysis result
    console.log("📊 AI Analysis Result:", JSON.stringify(analysisResult, null, 2));

    // 🟢 Step 5: Store analysis in database with correct `githubRepoId`
    try {
      console.log("📌 Storing analysis in database...");
      const savedAnalysis = await prisma.analysis.create({
        data: {
          userId,
          fileId: null, // No `File` entry for GitHub files
          githubRepoId, // ✅ Now correctly stored!
          result: analysisResult,
          commitHash: commitSha,
        },
      });

      console.log("✅ Analysis successfully saved in DB:", savedAnalysis);

      res.json({
        message: "File analyzed successfully",
        analysis: savedAnalysis,
      });
    } catch (error) {
      console.error("❌ Error saving analysis to DB:", error.message);
      res.status(500).json({
        message: "Database error while saving analysis",
        error: error.message,
      });
    }
  } catch (error) {
    console.error("❌ Internal Server Error:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};




export const fetchUserRepos = async (req, res) => {
  console.log("Incoming Headers:", req.headers);
  console.log("Decoded User:", req.user);

  try {
    const accessToken = req.user.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized: No GitHub access token" });
    }

    const githubApiUrl = "https://api.github.com/user/repos";
    const response = await axios.get(githubApiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("GitHub Repositories Response:", response.data);
    const repositories = response.data;

    const savedRepos = await Promise.all(
      repositories.map(async (repo) => {
        console.log(`Saving repository: ${repo.name}`);

        return prisma.githubRepo.upsert({
          where: { repoUrl: repo.html_url },
          update: {}, // No update needed for now
          create: {
            userId: req.user.id,
            repoName: repo.name,
            repoUrl: repo.html_url,
            ownerName: repo.owner.login,
            autoAnalyze: false, // Default to false if it's a new repo
          },
        });
      })
    );

    // Fetch updated repos from the database (including autoAnalyze)
    const updatedRepos = await prisma.githubRepo.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        userId: true,
        repoName: true,
        repoUrl: true,
        ownerName: true,
        autoAnalyze: true, // Ensure this is included
        createdAt: true,
      },
    });

    res.status(200).json({
      message: "Repositories fetched and saved successfully",
      repositories: updatedRepos,
    });
  } catch (error) {
    console.error("Error fetching repositories:", error.message);
    res.status(500).json({
      message: "Failed to fetch repositories",
      error: error.response?.data?.message || error.message,
    });
  }
};



export const fetchCommitDetails = async (req, res) => {
  try {
    const { owner, repo, commitSha } = req.params;
    const githubToken = req.user.accessToken;

    if (!githubToken) {
      return res.status(401).json({ message: "GitHub access token is missing" });
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    res.status(200).json({
      message: "Commit details fetched successfully",
      commitDetails: response.data,
    });
  } catch (error) {
    console.error("Error fetching commit details:", error);
    res.status(500).json({
      message: "Failed to fetch commit details",
      error: error.response?.data?.message || error.message,
    });
  }
};

export const fetchFileContent = async (req, res) => {
  try {
    const { owner, repo, commitSha, filePath } = req.params;
    const githubToken = req.user.accessToken;

    if (!githubToken) {
      return res.status(401).json({ message: "GitHub access token is missing" });
    }

    const encodedFilePath = encodeURIComponent(filePath);
    const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedFilePath}?ref=${commitSha}`;

    const response = await axios.get(contentsUrl, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    // const fileContent = Buffer.from(response.data.content, "base64").toString("utf-8");
    if (!response.data || !response.data.content) {
      console.error("❌ GitHub API response missing content:", response.data);
      return res.status(400).json({ message: "Failed to fetch file content" });
    }
    
    const fileContent = Buffer.from(response.data.content, "base64").toString("utf-8");
    console.log(`✅ File content fetched successfully: ${filePath}`);
    

    res.status(200).json({
      message: "File content fetched successfully",
      fileContent,
    });
  } catch (error) {
    console.error("Error fetching file content:", error);
    res.status(500).json({
      message: "Failed to fetch file content",
      error: error.response?.data?.message || error.message,
    });
  }
};


export const fetchRepoFiles = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const githubToken = req.user.accessToken;

    if (!githubToken) {
      return res.status(401).json({ message: "GitHub access token is missing" });
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    if (!response.data.tree) {
      return res.status(400).json({ message: "No files found in the repository" });
    }

    // Filter only files (exclude directories)
    const files = response.data.tree
      .filter((item) => item.type === "blob")
      .map((file) => file.path);

    res.status(200).json({
      message: "Repository files fetched successfully",
      files,
    });
  } catch (error) {
    console.error("Error fetching repository files:", error);
    res.status(500).json({
      message: "Failed to fetch repository files",
      error: error.response?.data?.message || error.message,
    });
  }
};



// import prisma from "../config/db.js";
// import axios from "axios";

// import axios from "axios";
// import prisma from "../config/db.js";
// import aiCodeAnalysis from "../utils/aiAnalysis.js"; // Import AI analysis function



// export const githubFileAnalysis = async (req, res) => {
//   try {
//     const { owner, repo } = req.params;
//     const { filePath } = req.body;
//     const accessToken = req.user.accessToken;

//     if (!filePath) {
//       return res.status(400).json({ message: "File path is required." });
//     }

//     const rawFileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;

//     const fileResponse = await axios.get(rawFileUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const fileContent = fileResponse.data;

//     // ✅ Call AI analysis function
//     const analysisResult = await aiCodeAnalysis(fileContent, filePath);

//     res.json({
//       message: "File analyzed successfully",
//       analysis: analysisResult,
//     });
//   } catch (error) {
//     console.error("❌ Error analyzing file:", error);
//     res.status(500).json({
//       message: "Error analyzing file",
//       error: error.message,
//     });
//   }
// };


// import axios from "axios";
// import prisma from "../config/db.js";
// import aiCodeAnalysis from "../utils/aiAnalysis.js"; // Import AI analysis function

// export const githubFileAnalysis = async (req, res) => {
//   try {
//     const { owner, repo } = req.params;
//     const { filePath } = req.body;
//     const accessToken = req.user.accessToken;

//     if (!filePath) {
//       return res.status(400).json({ message: "File path is required." });
//     }

//     // Construct the raw file URL
//     const rawFileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;

//     // Fetch the file content from GitHub
//     const fileResponse = await axios.get(rawFileUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const fileContent = fileResponse.data;

//     // ✅ Call AI analysis function
//     const analysisResult = await aiCodeAnalysis(fileContent, filePath);

//     res.json({
//       message: "File analyzed successfully",
//       analysis: analysisResult,
//     });
//   } catch (error) {
//     console.error("❌ Error analyzing file:", error);

//     if (error.response) {
//       return res.status(error.response.status).json({
//         message: "Error fetching file from GitHub",
//         error: error.response.data,
//       });
//     }

//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

import axios from "axios";
import prisma from "../config/db.js";
import aiCodeAnalysis from "../utils/aiAnalysis.js"; // Import AI analysis function

import { enableAutoAnalysis } from "../services/githubService.js";

export const enableAutoAnalysisController = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieved from authMiddleware
    const { repoName } = req.body;
    const githubToken = req.user.accessToken;

    if (!repoName) return res.status(400).json({ message: "Repository name is required" });
    console.log("User ID:", userId);
    console.log("GitHub Token:", githubToken);
    console.log("Repo Name:", repoName);

    const result = await enableAutoAnalysis(userId, repoName, githubToken);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const githubFileAnalysis = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const { filePath } = req.body;
    const userId = req.user.id; // Authenticated user ID
    const accessToken = req.user.accessToken;

    if (!filePath) {
      return res.status(400).json({ message: "File path is required." });
    }

    // Step 1️⃣: Fetch the latest commit SHA
    let commitSha = null;
    try {
      const commitsResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      commitSha = commitsResponse.data[0]?.sha || null; // Get latest commit SHA
    } catch (error) {
      console.error("❌ Error fetching latest commit SHA:", error.message);
      return res.status(error.response?.status || 500).json({
        message: "Error fetching latest commit SHA from GitHub",
        error: error.response?.data || error.message,
      });
    }

    // Step 2️⃣: Construct the raw file URL
    const rawFileUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;

    // Step 3️⃣: Fetch the file content from GitHub
    let fileContent;
    try {
      const fileResponse = await axios.get(rawFileUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      fileContent = fileResponse.data;
    } catch (error) {
      console.error("❌ Error fetching file from GitHub:", error.message);
      return res.status(error.response?.status || 500).json({
        message: "Error fetching file from GitHub",
        error: error.response?.data || error.message,
      });
    }

    // Step 4️⃣: Call AI analysis function
    const analysisResult = await aiCodeAnalysis(fileContent, filePath);

    // Step 5️⃣: Store analysis in database
    const savedAnalysis = await prisma.analysis.create({
      data: {
        userId,
        fileId: null, // No fileId since it's from GitHub
        result: analysisResult,
        commitHash: commitSha || "Unknown", // ✅ Handle null commit hash properly
      },
    });

    res.json({
      message: "File analyzed successfully",
      analysis: savedAnalysis, // Return saved DB record
    });
  } catch (error) {
    console.error("❌ Internal Server Error:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};





// export const fetchUserRepos = async (req, res) => {
//   console.log("Incoming Headers:", req.headers);
//   console.log("Decoded User:", req.user);

//   try {
//     const accessToken = req.user.accessToken;
//     if (!accessToken) {
//       return res.status(401).json({ message: "Unauthorized: No GitHub access token" });
//     }

//     const githubApiUrl = "https://api.github.com/user/repos";
//     const response = await axios.get(githubApiUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     console.log("GitHub Repositories Response:", response.data);
//     const repositories = response.data;

//     const savedRepos = await Promise.all(
//       repositories.map(async (repo) => {
//         console.log(`Saving repository: ${repo.name}`);
//         return prisma.githubRepo.upsert({
//           where: { repoUrl: repo.html_url },
//           update: {},
//           create: {
//             userId: req.user.id,
//             repoName: repo.name,
//             repoUrl: repo.html_url,
//           },
//         });
//       })
//     );

//     res.status(200).json({
//       message: "Repositories fetched and saved successfully",
//       repositories: savedRepos,
//     });
//   } catch (error) {
//     console.error("Error fetching repositories:", error.message);
//     res.status(500).json({
//       message: "Failed to fetch repositories",
//       error: error.response?.data?.message || error.message,
//     });
//   }
// };

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
          update: {},
          create: {
            userId: req.user.id,
            repoName: repo.name,
            repoUrl: repo.html_url,
            ownerName: repo.owner.login, // Extract and store ownerName
          },
        });
      })
    );

    // Modify the response to include `ownerName`
    const updatedRepos = savedRepos.map(repo => ({
      id: repo.id,
      userId: repo.userId,
      repoName: repo.repoName,
      repoUrl: repo.repoUrl,
      ownerName: repo.ownerName, // Ensure ownerName is included in the response
      createdAt: repo.createdAt
    }));

    res.status(200).json({
      message: "Repositories fetched and saved successfully",
      repositories: updatedRepos, // Send the modified response
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






// export const fetchFileContent = async ({ owner, repo, commitSha, filePath, userId }, returnData = false) => {
//   try {
//     const user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user || !user.githubAccessToken) {
//       throw new Error("GitHub access token is missing");
//     }

//     console.log("User Data:", user); // Debugging

//     // ✅ Fix: Ensure proper encoding of file paths
//     const encodedFilePath = encodeURIComponent(filePath);
//     const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedFilePath}?ref=${commitSha}`;

//     const response = await axios.get(contentsUrl, {
//       headers: { Authorization: `Bearer ${user.githubAccessToken}` },
//     });

//     const fileContent = Buffer.from(response.data.content, "base64").toString("utf-8");

//     return { message: "File content fetched successfully", fileContent };
//   } catch (error) {
//     console.error("Error fetching file content:", error);
//     return { message: "Failed to fetch file content", error: error.response?.data?.message || error.message };
//   }
// };


















// export const fetchFileContent = async (req, res, returnData = false) => {
//   try {
//     const { owner, repo, commitSha, filePath } = req.params;
//     const githubToken = req.user.accessToken;

//     if (!githubToken) {
//       return res.status(401).json({ message: "GitHub access token is missing" });
//     }

//     const encodedFilePath = encodeURIComponent(filePath);
//     const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedFilePath}?ref=${commitSha}`;

//     const response = await axios.get(contentsUrl, {
//       headers: { Authorization: `Bearer ${githubToken}` },
//     });

//     const fileContent = Buffer.from(response.data.content, "base64").toString("utf-8");

//     if (returnData) {
//       return { message: "File content fetched successfully", fileContent };
//     }

//     res.status(200).json({
//       message: "File content fetched successfully",
//       fileContent,
//     });
//   } catch (error) {
//     console.error("Error fetching file content:", error);
//     res.status(500).json({
//       message: "Failed to fetch file content",
//       error: error.response?.data?.message || error.message,
//     });
//   }
// };


// export const fetchFileContent = async (req, res) => {
//   try {
//     const { owner, repo, commitSha, filePath } = req.params;
//     const githubToken = req.user.accessToken;

//     if (!githubToken) {
//       return res.status(401).json({ message: "GitHub access token is missing" });
//     }

//     const encodedFilePath = encodeURIComponent(filePath);
//     const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedFilePath}?ref=${commitSha}`;

//     const response = await axios.get(contentsUrl, {
//       headers: { Authorization: `Bearer ${githubToken}` },
//     });

//     const fileContent = Buffer.from(response.data.content, "base64").toString("utf-8");

//     res.status(200).json({
//       message: "File content fetched successfully",
//       fileContent,
//     });
//   } catch (error) {
//     console.error("Error fetching file content:", error);
//     res.status(500).json({
//       message: "Failed to fetch file content",
//       error: error.response?.data?.message || error.message,
//     });
//   }
// };




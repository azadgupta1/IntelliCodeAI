import axios from "axios";
import prisma from "../config/db.js";
import analyzeCode from "../utils/aiAnalysis.js";


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

    const githubRepo = await prisma.githubRepo.findFirst({
      where: { ownerName: owner, repoName: repo, userId },
      include: { analyses: { include: { file: true } } }, 
    });

    if (!githubRepo) {
      console.warn(`🚫 Repository ${repo} not found or not owned by user ${userId}`);
      return res.status(404).json({ success: false, message: "Repository not found or not owned by user" });
    }

    // Map over analyses and add count fields
    const modifiedAnalyses = githubRepo.analyses.map((analysis) => {
      const result = analysis.result || { errors: [], suggestions: [], optimizations: [] };

      return {
        ...analysis,
        errorCount: result.errors?.length || 0,
        suggestionCount: result.suggestions?.length || 0,
        optimizationCount: result.optimizations?.length || 0,
      };
    });

    console.log("✅ Modified analyses with counts:", modifiedAnalyses);

    res.json({ success: true, analyses: modifiedAnalyses });

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

import fixCode from "../utils/aiFixCode.js";

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

      console.log("File CODE is ---", fileContent);
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
    const analysisResult = await analyzeCode(fileContent, filePath);
    console.log("HERE IS the AI Analysis completed.");

    const fixedCodeRes = await fixCode(fileContent, analysisResult);

    console.log("Here is the FIXED code --: ",fixedCodeRes);

    // Debug Log: Check analysis result
    console.log("📊 AI Analysis Result:", JSON.stringify(analysisResult, null, 2));

        const numErrors = analysisResult.errors?.length || 0;
        const numSuggestions = analysisResult.suggestions?.length || 0;
        const numOptimizations = analysisResult.optimizations?.length || 0;

        console.log("Errors COUNT IS ------------------", numErrors);
        console.log("Suggestion COUNT IS ------------------", numSuggestions);
        console.log("Optimization COUNT IS -----------", numOptimizations);

    // 🟢 Step 5: Store analysis in database with correct `githubRepoId`
    try {
      console.log("📌 Storing analysis in database...");
      const savedAnalysis = await prisma.analysis.create({
        data: {
          userId,
          fileId: null, // No `File` entry for GitHub files
          githubRepoId, // ✅ Now correctly stored!
          result: analysisResult,
          filePath,
          commitHash: commitSha,
          errorCnt: numErrors,
          suggestionCnt: numSuggestions,
          optimizationCnt: numOptimizations,
          originalCode: fileContent,
          fixedCode: fixedCodeRes,
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



// export const fetchUserRepos = async (req, res) => {
//   console.log("Incoming Headers:", req.headers);
//   console.log("Decoded User:", req.user);

//   try {
//     const accessToken = req.user.accessToken;
//     if (!accessToken) {
//       return res.status(401).json({ message: "Unauthorized: No GitHub access token" });
//     }

//     const githubApiUrl = "https://api.github.com/user/repos?per_page=100";
//     const response = await axios.get(githubApiUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const repositories = response.data;
//     const savedRepos = [];

//     for (const repo of repositories) {
//       console.log(`Saving repository: ${repo.name}`);
//       let lastCommitDate = null;

//       try {
//         const commitsUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`;
//         const commitsResponse = await axios.get(commitsUrl, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         lastCommitDate = commitsResponse.data[0]?.commit?.committer?.date;
//       } catch (commitErr) {
//         console.warn(`Error fetching commits for repo ${repo.name}:`, commitErr.message);
//       }

//       try {
//         const savedRepo = await prisma.githubRepo.upsert({
//           where: {
//             repoName_userId: {
//               repoName: repo.name,
//               userId: req.user.id,
//             },
//           },
//           update: {
//             lastCommitAt: lastCommitDate ? new Date(lastCommitDate) : undefined,
//           },
//           create: {
//             userId: req.user.id,
//             repoName: repo.name,
//             repoUrl: repo.html_url,
//             ownerName: repo.owner.login,
//             autoAnalyze: false,
//             lastCommitAt: lastCommitDate ? new Date(lastCommitDate) : undefined,
//           },
//         });

//         savedRepos.push(savedRepo);
//       } catch (dbErr) {
//         console.error(`DB error for repo ${repo.name}:`, dbErr.message);
//       }
//     }

//     const updatedRepos = await prisma.githubRepo.findMany({
//       where: { userId: req.user.id },
//       select: {
//         id: true,
//         userId: true,
//         repoName: true,
//         repoUrl: true,
//         ownerName: true,
//         autoAnalyze: true,
//         createdAt: true,
//         errorCount: true,
//         lastCommitAt: true,
//       },
//     });

//     res.status(200).json({
//       message: "Repositories fetched and saved successfully",
//       repositories: updatedRepos,
//     });
//   } catch (error) {
//     console.error("Error fetching repositories:", error.message);
//     res.status(500).json({
//       message: "Failed to fetch repositories",
//       error: error.response?.data?.message || error.message,
//     });
//   }
// };

// import pLimit from 'p-limit';

// const limit = pLimit(5);

// export const fetchUserRepos = async (req, res) => {
//   console.log("Incoming Headers:", req.headers);
//   console.log("Decoded User:", req.user);

//   try {
//     const accessToken = req.user.accessToken;
//     if (!accessToken) {
//       return res.status(401).json({ message: "Unauthorized: No GitHub access token" });
//     }

//     // Step 1: Fetch GitHub Repos (limit to 30 to avoid rate limits)
//     const githubApiUrl = "https://api.github.com/user/repos?per_page=100";
//     const response = await axios.get(githubApiUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     const repositories = response.data.slice(0, 30); // optional: process only 30 repos

//     // Step 2: Parallel fetch + save using Promise.all
//     const repoPromises = repositories.map(limit(async (repo) => {
//       let lastCommitDate = null;

//       try {
//         const commitsUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`;
//         const commitsResponse = await axios.get(commitsUrl, {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         lastCommitDate = commitsResponse.data[0]?.commit?.committer?.date;
//       } catch (commitErr) {
//         console.warn(`Error fetching commits for ${repo.name}:`, commitErr.message);
//       }

//       try {
//         const savedRepo = await prisma.githubRepo.upsert({
//           where: {
//             repoName_userId: {
//               repoName: repo.name,
//               userId: req.user.id,
//             },
//           },
//           update: {
//             lastCommitAt: lastCommitDate ? new Date(lastCommitDate) : undefined,
//           },
//           create: {
//             userId: req.user.id,
//             repoName: repo.name,
//             repoUrl: repo.html_url,
//             ownerName: repo.owner.login,
//             autoAnalyze: false,
//             lastCommitAt: lastCommitDate ? new Date(lastCommitDate) : undefined,
//           },
//         });

//         return savedRepo;
//       } catch (dbErr) {
//         console.error(`DB error for repo ${repo.name}:`, dbErr.message);
//         return null;
//       }
//     }
//   );

//     // Wait for all repos to finish processing
//     await Promise.all(repoPromises);

//     // Step 3: Return all saved repos
//     const updatedRepos = await prisma.githubRepo.findMany({
//       where: { userId: req.user.id },
//       select: {
//         id: true,
//         userId: true,
//         repoName: true,
//         repoUrl: true,
//         ownerName: true,
//         autoAnalyze: true,
//         createdAt: true,
//         errorCount: true,
//         lastCommitAt: true,
//       },
//     });

//     res.status(200).json({
//       message: "Repositories fetched and saved successfully",
//       repositories: updatedRepos,
//     });
//   } catch (error) {
//     console.error("Error fetching repositories:", error.message);
//     res.status(500).json({
//       message: "Failed to fetch repositories",
//       error: error.response?.data?.message || error.message,
//     });
//   }
// };

import pLimit from "p-limit";

const limit = pLimit(30); // only 5 parallel promises at a time

export const fetchUserRepos = async (req, res) => {
  console.log("Incoming Headers:", req.headers);
  console.log("Decoded User:", req.user);

  try {
    const accessToken = req.user.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized: No GitHub access token" });
    }

    // Step 1: Fetch GitHub Repos (limit to 30 to avoid GitHub rate limits)
    const githubApiUrl = "https://api.github.com/user/repos?per_page=100";
    const response = await axios.get(githubApiUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const repositories = response.data.slice(0, 30); // process only 30 repos

    // Step 2: Parallel fetch+save with concurrency limit
    const repoPromises = repositories.map((repo) =>
      limit(async () => {
        let lastCommitDate = null;

        try {
          const commitsUrl = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/commits`;
          const commitsResponse = await axios.get(commitsUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          lastCommitDate = commitsResponse.data[0]?.commit?.committer?.date;
        } catch (commitErr) {
          console.warn(`Error fetching commits for ${repo.name}:`, commitErr.message);
        }

        try {
          const savedRepo = await prisma.githubRepo.upsert({
            where: {
              repoName_userId: {
                repoName: repo.name,
                userId: req.user.id,
              },
            },
            update: {
              lastCommitAt: lastCommitDate ? new Date(lastCommitDate) : undefined,
            },
            create: {
              userId: req.user.id,
              repoName: repo.name,
              repoUrl: repo.html_url,
              ownerName: repo.owner.login,
              autoAnalyze: false,
              lastCommitAt: lastCommitDate ? new Date(lastCommitDate) : undefined,
            },
          });

          return savedRepo;
        } catch (dbErr) {
          console.error(`DB error for repo ${repo.name}:`, dbErr.message);
          return null;
        }
      })
    );

    // Wait for all promises to finish
    await Promise.all(repoPromises);

    // Step 3: Return all saved repos
    const updatedRepos = await prisma.githubRepo.findMany({
      where: { userId: req.user.id },
      select: {
        id: true,
        userId: true,
        repoName: true,
        repoUrl: true,
        ownerName: true,
        autoAnalyze: true,
        createdAt: true,
        errorCount: true,
        lastCommitAt: true,
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



// export const fetchAnalyzedRepos = async (req, res) => {
//   console.log("Incoming Headers:", req.headers);
//   console.log("Decoded User:", req.user);

//   try {
//     // Ensure we have a valid access token
//     const accessToken = req.user.accessToken;
//     if (!accessToken) {
//       return res.status(401).json({ message: "Unauthorized: No GitHub access token" });
//     }

//     // Fetch repos with autoAnalyze set to true
//     const repos = await prisma.githubRepo.findMany({
//       where: {
//         userId: req.user.id,
//         autoAnalyze: true, // Only fetch repos with autoAnalyze set to true
//       },
//       select: {
//         id: true,
//         repoName: true,
//         repoUrl: true,
//         ownerName: true,
//         createdAt: true,
//         errorCount: true,
//       },
//     });

//     // If no repos are found with autoAnalyze set to true
//     if (repos.length === 0) {
//       return res.status(404).json({ message: "No repositories to analyze." });
//     }

//     // Fetch the latest commit timestamp for each repo
//     const reposWithCommitData = await Promise.all(
//       repos.map(async (repo) => {
//         try {
//           const githubApiUrl = `https://api.github.com/repos/${repo.ownerName}/${repo.repoName}/commits`;

//           // Make the API call with the Authorization header for private repositories
//           const response = await axios.get(githubApiUrl, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`, // Include the token in the header
//             },
//           });

//           // Get the timestamp of the latest commit (the first commit in the response)
//           const latestCommit = response.data[0];
//           const latestCommitDate = new Date(latestCommit.commit.author.date);

//           return {
//             ...repo,
//             latestCommitDate, // Add the latest commit date to the repo data
//           };
//         } catch (error) {
//           console.error(`Error fetching commits for repo ${repo.repoName}:`, error.message);
//           return { ...repo, latestCommitDate: null }; // In case of error, nullify the commit date
//         }
//       })
//     );

//     // Sort the repos by the latest commit date (descending)
//     const sortedRepos = reposWithCommitData
//       .filter(repo => repo.latestCommitDate) // Filter out repos without a valid commit date
//       .sort((a, b) => b.latestCommitDate - a.latestCommitDate); // Sort by the latest commit date in descending order

//     // Return the sorted repos

//     console.log("DATA is ", sortedRepos);
//     res.status(200).json({
//       message: "Repositories fetched successfully",
//       repositories: sortedRepos,
//     });
//   } catch (error) {
//     console.error("Error fetching analyzed repositories:", error.message);
//     res.status(500).json({
//       message: "Failed to fetch analyzed repositories",
//       error: error.response?.data?.message || error.message,
//     });
//   }
// };


export const fetchAnalyzedRepos = async (req, res) => {
  console.log("Incoming Headers:", req.headers);
  console.log("Decoded User:", req.user);

  try {
    const accessToken = req.user.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized: No GitHub access token" });
    }

    // Fetch repos with autoAnalyze set to true
    const repos = await prisma.githubRepo.findMany({
      where: {
        userId: req.user.id,
        autoAnalyze: true,
      },
      select: {
        id: true,
        repoName: true,
        repoUrl: true,
        ownerName: true,
        createdAt: true,
        errorCount: true,
      },
    });

    // 🛠️ FIX: Don't return 404 here. Return 200 with empty array.
    if (repos.length === 0) {
      return res.status(200).json({
        message: "No repositories to analyze.",
        repositories: [],
      });
    }

    const reposWithCommitData = await Promise.all(
      repos.map(async (repo) => {
        try {
          const githubApiUrl = `https://api.github.com/repos/${repo.ownerName}/${repo.repoName}/commits`;

          const response = await axios.get(githubApiUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const latestCommit = response.data[0];
          const latestCommitDate = new Date(latestCommit.commit.author.date);

          return {
            ...repo,
            latestCommitDate,
          };
        } catch (error) {
          console.error(`Error fetching commits for repo ${repo.repoName}:`, error.message);
          return { ...repo, latestCommitDate: null };
        }
      })
    );

    const sortedRepos = reposWithCommitData
      .filter(repo => repo.latestCommitDate)
      .sort((a, b) => b.latestCommitDate - a.latestCommitDate);

    console.log("DATA is ", sortedRepos);
    return res.status(200).json({
      message: "Repositories fetched successfully",
      repositories: sortedRepos,
    });
  } catch (error) {
    console.error("Error fetching analyzed repositories:", error.message);
    return res.status(500).json({
      message: "Failed to fetch analyzed repositories",
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

    // Filter only files (blobs), and exclude anything inside node_modules
    const files = response.data.tree
      .filter(
        (item) =>
          item.type === "blob" && !item.path.startsWith("node_modules/")
      )
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



export const getRepoById = async (req, res) => {
  const { repoId } = req.params;

  try {

    console.log("Running...");
    const repo = await prisma.githubRepo.findUnique({
      where: { id: parseInt(repoId) },
    });

    console.log("Running...")

    if (!repo) {
      return res.status(404).json({ message: "Repository not found" });
    }

    console.log("Repo data is : ",repo);

    return res.json({ repo });
  } catch (error) {
    console.error("Error fetching repo by ID:", error);
    return res.status(500).json({ message: "Failed to fetch repository" });
  }
};


export const fetchRepoCommits = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const githubToken = req.user.accessToken;

    if (!githubToken) {
      return res.status(401).json({ message: "GitHub access token is missing" });
    }

    const commitsUrl = `https://api.github.com/repos/${owner}/${repo}/commits`;

    const response = await axios.get(commitsUrl, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    const commits = response.data;

    res.status(200).json({
      message: "Commits fetched successfully",
      commits,
    });
  } catch (error) {
    console.error("Error fetching commits:", error);
    res.status(500).json({
      message: "Failed to fetch commits",
      error: error.response?.data?.message || error.message,
    });
  }
};







// inside githubController.js
// const prisma = require('../prismaClient'); // or wherever your Prisma instance is

export const getRepoErrors = async (req, res) => {
  try {
    const { ownerName, repo } = req.params;

    const repoData = await prisma.GithubRepo.findFirst({
      where: {
        ownerName,
        repoName: repo,
      },
      select: {
        id: true,
        errorCount: true, // assuming you have this field
      },
    });

    console.log(repoData);

    if (!repoData) {
      return res.status(404).json({ success: false, message: "Repository not found" });
    }

    res.json({ success: true, data: repoData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const syncRepoMetadata = async (req, res) => {
  const { owner, repo } = req.params;
  const userId = req.user.id;

  try {
    const token = req.user.accessToken; // assumes accessToken is stored in JWT and set via auth middleware

    // Fetch repo details from GitHub
    const repoRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const defaultBranch = repoRes.data.default_branch;

    // Fetch branches list
    const branchesRes = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // const branchNames = branchesRes.data.map((b) => b.name);
    // const branchInfo = branchesRes.data.map((b) => ({
    //   name: b.name,
    //   lastUpdated: b.commit?.commit?.committer?.date || null,
    // }));
    const branchInfo = await Promise.all(
      branchesRes.data.map(async (b) => {
        try {
          const commitRes = await axios.get(b.commit.url, {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          return {
            name: b.name,
            lastUpdated: commitRes.data.commit.committer.date || null,
          };
        } catch (err) {
          console.error(`Failed to fetch commit for branch ${b.name}:`, err.message);
          return {
            name: b.name,
            lastUpdated: null,
          };
        }
      })
    );
    
    
    const now = new Date();

    const updatedRepo = await prisma.githubRepo.update({
      where: {
        repoName_userId: {
          repoName: repo,
          userId,
        },
      },
      data: {
        defaultBranch,
        branches: branchInfo,
        lastSyncedAt: now,
      },
    });

    return res.status(200).json(updatedRepo);
  } catch (err) {
    console.error("Sync failed:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to sync repository metadata" });
  }
};






export const getRepoSettings = async (req, res) => {
  const { owner, repo } = req.params;
  const userId = req.user.id;

  try {
    const repoData = await prisma.githubRepo.findFirst({
      where: {
        userId,
        ownerName: owner,
        repoName: repo,
      },
      select: {
        repoName: true,
        ownerName: true,
        defaultBranch: true,
        branches: true,
        lastSyncedAt: true,
        autoAnalyze: true,
      },
    });

    if (!repoData) {
      return res.status(404).json({ error: 'Repository not found' });
    }

    res.json(repoData);
  } catch (error) {
    console.error('Error fetching repo settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




export const deleteGithubRepo = async (req, res) => {
  const { owner, repoName } = req.params;
  const userId = req.user.id;
  const githubToken = req.user.accessToken; // ✅ Use user's token

  try {
    const repo = await prisma.githubRepo.findFirst({
      where: {
        ownerName: owner,
        repoName,
        userId,
      },
    });

    if (!repo) {
      return res.status(404).json({ error: "Repository not found." });
    }

    // 🔌 Try to delete the GitHub webhook if it exists
    if (repo.autoAnalyze && repo.webhookId) {
      try {
        await axios.delete(
          `https://api.github.com/repos/${owner}/${repoName}/hooks/${repo.webhookId}`,
          {
            headers: {
              Authorization: `Bearer ${githubToken}`, // ✅ Fix here
              Accept: "application/vnd.github+json",
            },
          }
        );
        console.log("✅ Webhook deleted.");
      } catch (err) {
        console.error("❌ Failed to delete webhook:", err.response?.data || err.message);
        // Continue anyway — webhook deletion failure shouldn't block repo cleanup
      }
    }

    // ⚙️ Clean the repo: reset settings & delete analyses
    await prisma.analysis.deleteMany({
      where: {
        githubRepoId: repo.id,
      },
    });

    await prisma.githubRepo.update({
      where: {
        id: repo.id,
      },
      data: {
        autoAnalyze: false,
        errorCount: 0,
        webhookId: null,
        lastSyncedAt: null,
      },
    });

    res.json({ message: "Repository reset: analyses deleted, auto-analysis disabled." });
  } catch (error) {
    console.error("❌ Error deleting repo info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteAccount = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // 🔍 Fetch user GitHub token and ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        githubAccessToken: true,
        githubId: true,
      },
    });

    if (user?.githubAccessToken) {
      try {
        const response = await axios.delete(
          `https://api.github.com/applications/${process.env.GITHUB_CLIENT_ID}/token`,
          {
            auth: {
              username: process.env.GITHUB_CLIENT_ID,
              password: process.env.GITHUB_CLIENT_SECRET,
            },
            data: {
              access_token: user.githubAccessToken,
            },
          }
        );
    
        if (response.status === 204) {
          console.log("✅ GitHub token revoked successfully (204 No Content)");
        } else {
          console.warn("⚠️ Unexpected response from GitHub:", response.status, response.data);
        }
      } catch (err) {
        console.error("❌ Failed to revoke GitHub token:", err.response?.data || err.message);
      }
    }
    

    // 🧹 Clean up GitHub webhooks
    const reposWithWebhooks = await prisma.githubRepo.findMany({
      where: {
        userId,
        autoAnalyze: true,
        webhookId: { not: null },
      },
    });

    for (const repo of reposWithWebhooks) {
      try {
        await axios.delete(
          `https://api.github.com/repos/${repo.ownerName}/${repo.repoName}/hooks/${repo.webhookId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              Accept: "application/vnd.github+json",
            },
          }
        );
        console.log(`✅ Webhook deleted for ${repo.repoName}`);
      } catch (err) {
        console.error(
          `❌ Failed to delete webhook for ${repo.repoName}:`,
          err.response?.data || err.message
        );
        // Continue deleting account anyway
      }
    }

    // 🗑️ Delete user and cascade to related models
    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: "✅ Account, GitHub access, and related data deleted successfully." });
  } catch (error) {
    console.error("❌ Error deleting account:", error);
    res.status(500).json({ error: "Failed to delete account." });
  }
};


export const fetchPullRequests = async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const githubToken = req.user.accessToken;

    if (!githubToken) {
      return res.status(401).json({ message: "GitHub access token is missing" });
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/pulls?state=all`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${githubToken}` },
    });

    const pullRequests = response.data.map(pr => ({
      id: pr.id,
      number: pr.number,
      title: pr.title,
      state: pr.state,
      created_at: pr.created_at,
      updated_at: pr.updated_at,
      merged_at: pr.merged_at,
      user: {
        login: pr.user.login,
        avatar_url: pr.user.avatar_url,
      },
      html_url: pr.html_url,
    }));


    console.log("Pull Request Details : ",pullRequests);

    res.status(200).json({
      message: "Pull requests fetched successfully",
      pullRequests,
    });
  } catch (error) {
    console.error("Error fetching pull requests:", error);
    res.status(500).json({
      message: "Failed to fetch pull requests",
      error: error.response?.data?.message || error.message,
    });
  }
};




export const fetchChangedFiles = async (req, res) => {
  try {
    const { owner, repo, pull_number } = req.params;
    const githubToken = req.user?.accessToken; // Or hardcode temporarily for Postman testing

    if (!githubToken) {
      return res.status(401).json({ message: "GitHub access token is missing" });
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pull_number}/files`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const changedFiles = response.data.map(file => ({
      filename: file.filename,
      status: file.status,           // 'modified', 'added', 'removed'
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
      patch: file.patch              // The actual diff (if available)
    }));

    res.status(200).json({
      message: 'Changed files fetched successfully',
      changedFiles,
    });
  } catch (error) {
    console.error("Error fetching changed files:", error.message);
    res.status(500).json({
      message: "Failed to fetch changed files",
      error: error.response?.data?.message || error.message,
    });
  }
};

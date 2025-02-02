// import prisma from "../config/db.js";
// import axios from "axios";

// export const fetchUserRepos = async (req, res) => {
//   console.log("Incoming Headers:", req.headers);
//   console.log("Decoded User:", req.user); // Log decoded user

//   try {
//     const accessToken = req.user.accessToken;
//     if (!accessToken) {
//       return res.status(401).json({ message: "Unauthorized: No GitHub access token" });
//     }

//     const githubApiUrl = "https://api.github.com/user/repos";
//     const response = await axios.get(githubApiUrl, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     console.log("GitHub Repositories Response:", response.data); // Log response
//     const repositories = response.data;

//     const savedRepos = [];
//     for (const repo of repositories) {
//       console.log(`Saving repository: ${repo.name}`); // Log each repo
//       const savedRepo = await prisma.githubRepo.upsert({
//         where: { repoUrl: repo.html_url },
//         update: {},
//         create: {
//           userId: req.user.id,
//           repoName: repo.name,
//           repoUrl: repo.html_url,
//         },
//       });
//       console.log(`Repository saved: ${savedRepo.repoName}`);
//       savedRepos.push(savedRepo);
//     }

//     res.status(200).json({
//       message: "Repositories fetched and saved successfully",
//       repositories: savedRepos,
//     });
//   } catch (error) {
//     console.error("Error fetching repositories:", error.message);
//     res.status(500).json({
//       message: "Failed to fetch repositories",
//       error: error.message,
//     });
//   }
// };



// export const fetchCommitDetails = async (req, res) => {
//   try {
//     const { owner, repo, commitSha } = req.params;

//     // Get the authenticated user's GitHub token
//     const githubToken = req.user.accessToken;
//     if (!githubToken) {
//       return res.status(401).json({ message: "GitHub access token is missing" });
//     }

//     // GitHub API URL for fetching commit details
//     const url = `https://api.github.com/repos/${owner}/${repo}/commits/${commitSha}`;

//     // Make a request to GitHub API
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${githubToken}`,
//       },
//     });

//     // Respond with the commit details
//     res.status(200).json({
//       message: "Commit details fetched successfully",
//       commitDetails: response.data,
//     });
//   } catch (error) {
//     console.error("Error fetching commit details:", error);
//     res.status(500).json({
//       message: "Failed to fetch commit details",
//       error: error.response?.data || error.message,
//     });
//   }
// };


// export const fetchFileContent = async (req, res) => {
//   try {
//     const { owner, repo, commitSha, filePath } = req.params;

//     // Get the authenticated user's GitHub token
//     const githubToken = req.user.accessToken;
//     if (!githubToken) {
//       return res.status(401).json({ message: "GitHub access token is missing" });
//     }

//     // GitHub API URL for fetching file content from the commit
//     const contentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${commitSha}`;

//     // Make a request to GitHub API to fetch file content
//     const response = await axios.get(contentsUrl, {
//       headers: {
//         Authorization: `Bearer ${githubToken}`,
//       },
//     });

//     // Decode the base64 content (GitHub API returns file content in base64 encoding)
//     const fileContent = Buffer.from(response.data.content, 'base64').toString('utf-8');

//     // Respond with the file content
//     res.status(200).json({
//       message: "File content fetched successfully",
//       fileContent: fileContent,
//     });
//   } catch (error) {
//     console.error("Error fetching file content:", error);
//     res.status(500).json({
//       message: "Failed to fetch file content",
//       error: error.response?.data || error.message,
//     });
//   }
// };


import prisma from "../config/db.js";
import axios from "axios";

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
          },
        });
      })
    );

    res.status(200).json({
      message: "Repositories fetched and saved successfully",
      repositories: savedRepos,
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

    const fileContent = Buffer.from(response.data.content, "base64").toString("utf-8");

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

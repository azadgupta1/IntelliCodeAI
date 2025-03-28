// // src/services/githubServices.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:3000", // Adjust the backend URL if needed
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Fetch User Repositories
// export const fetchUserRepos = async () => {
//   try {
//     // Get the token from localStorage (assuming you store it after login)
//     const token = localStorage.getItem("accessToken");

//     if (!token) {
//       throw new Error("GitHub access token is missing");
//     }

//     const response = await api.get("/github/repos", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data.repositories;
//   } catch (error) {
//     console.error("Error fetching user repositories:", error.response?.data || error.message);
//     throw error;
//   }
// };


import axios from "axios";

const API_BASE_URL =  "http://localhost:3000";


export const fetchRepoFiles = async (owner, repo) => {
  const response = await axios.get(`${API_BASE_URL}/repos/${owner}/${repo}/files`, {
    withCredentials: true, // Ensures cookies/session are sent
  });
  return response.data.files;
};

// Analyze a specific file
export const analyzeGithubFile = async (owner, repo, filePath) => {
  const response = await axios.get(`${API_BASE_URL}/github/analyze/file/${owner}/${repo}/main/${filePath}`, {
    withCredentials: true,
  });
  return response.data.analysisResult;
};

export const fetchAnalysisHistory = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analysis/history`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching analysis history:", error);
    return { success: false, message: "Failed to fetch analysis history" };
  }
};

export const fetchAnalysisById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/analysis/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching analysis details:", error);
    return { success: false, message: "Failed to fetch analysis details" };
  }
};








// import axios from "axios";

const API_URL = "http://localhost:3000"; // Backend running on port 3000

// Fetch user repositories
export const fetchUserRepos = async () => {
  try {
    const response = await axios.get(`${API_URL}/github/repos`, { withCredentials: true });
    return response.data.repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

// Fetch commit details
export const fetchCommitDetails = async (owner, repo, commitSha) => {
  try {
    const response = await axios.get(`${API_URL}/github/repos/${owner}/${repo}/commits/${commitSha}`, {
      withCredentials: true,
    });
    return response.data.commitDetails;
  } catch (error) {
    console.error("Error fetching commit details:", error);
    return null;
  }
};

// Fetch file content for AI analysis
export const fetchFileContent = async (owner, repo, commitSha, filePath) => {
  try {
    const response = await axios.get(
      `${API_URL}/github/repos/${owner}/${repo}/commits/${commitSha}/file/${encodeURIComponent(filePath)}`,
      { withCredentials: true }
    );
    return response.data.fileContent;
  } catch (error) {
    console.error("Error fetching file content:", error);
    return null;
  }
};

// Analyze a GitHub file
export const analyzeFile = async (owner, repo, commitSha, filePath) => {
  try {
    const response = await axios.get(
      `${API_URL}/github/analyze/file/${owner}/${repo}/${commitSha}/${encodeURIComponent(filePath)}`,
      { withCredentials: true }
    );
    return response.data.analysisResult;
  } catch (error) {
    console.error("Error analyzing file:", error);
    return null;
  }
};

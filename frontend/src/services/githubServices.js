import axios from "axios";

const API_BASE_URL =  "http://localhost:3000";


// Fetch AI-fixed code
// export const fetchAIFixedCode = async (owner, repo, commitSha, filePath, token) => {
//   try {
//     const res = await axios.get(`${API_URL}/api/fix/github/fix/file/${owner}/${repo}/${commitSha}/${encodeURIComponent(filePath)}`, {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });
//     return { success: true, fixedCode: res.data.fixedCode };
//   } catch (err) {
//     return { success: false };
//   }
// };

// export const fetchAIFixedCode = async (owner, repo, commitSha, filePath, token) => {
//   try {
//     const url = `${API_BASE_URL}/api/fix/github/fix/file/${owner}/${repo}/${commitSha}/${encodeURIComponent(filePath)}`;
//     console.log("🌐 fetchAIFixedCode URL:", url);

//     const res = await axios.get(url, {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });

//     console.log("🧠 Backend AI Fixed Code Response:", res.data);

//     return { success: true, 
//             fixedCode: res.data.fixed,
//             originalCode: res.data.original,
//           };
    
//   } catch (err) {
//     console.error("❌ fetchAIFixedCode error:", err.response?.data || err.message);
//     return { success: false };
//   }
// };


// import axios from 'axios';
// import { API_BASE_URL } from '../config'; // Adjust path as needed

export const fetchAIFixedCode = async (owner, repo, commitSha, filePath, token) => {
  try {
    const encodedPath = encodeURIComponent(filePath);
    const url = `${API_BASE_URL}/api/fix/github/fix/file/${owner}/${repo}/${commitSha}/${encodedPath}`;
    console.log("🌐 fetchAIFixedCode URL:", url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    const { original, fixed } = response.data;

    if (!original || !fixed) {
      throw new Error("Incomplete AI code response");
    }

    console.log("🧠 Backend AI Fixed Code Response:", response.data);

    return {
      success: true,
      originalCode: original,
      fixedCode: fixed,
    };

  } catch (error) {
    console.error("❌ fetchAIFixedCode error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to fetch AI-fixed code",
    };
  }
};



// Commit the AI fix
// export const commitFixedCodeToGitHub = async (owner, repo, commitSha, filePath, fixedCode, token) => {
//   try {
//     const res = await axios.post(`${API_URL}/api/fix/commit-fixed-code`, {
//       owner,
//       repo,
//       commitSha,
//       filePath,
//       fixedCode,
//     }, {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });

//     return { success: true, data: res.data };
//   } catch (err) {
//     return { success: false };
//   }
// };


export const commitFixedCodeToGitHub = async (owner, repo, commitSha, filePath, fixedCode, token, numErrors, githubRepoId) => {
  console.log('🚀 Calling commit API with:', {
    owner,
    repo,
    commitSha,
    filePath,
    hasCode: !!fixedCode,
    hasToken: !!token,
  });

  try {
    const res = await axios.post(`${API_URL}/api/fix/commit-fixed-code`, {
      owner,
      repo,
      filePath,
      fixedCode,
      githubRepoId,         
      fixedErrorCount: numErrors,
    }, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    console.log('✅ Commit API Success:', res.data);

    return { success: true, data: res.data };
  } catch (err) {
    console.error('❌ Commit API Error:', err.response?.data || err.message);
    return { success: false, error: err.response?.data || err.message };
  }
};


export const fetchGithubRepoById = async (repoId, token) => {
  try {
    const res = await axios.get(`${API_URL}/github/repos/id/${repoId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return { success: true, data: res.data.repo };
  } catch (error) {
    return { success: false, message: "Failed to fetch repo info" };
  }
};




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

// export const markAsCommitted = async (analysisId, token) => {
//   try {
//     const res = await fetch(`${API_BASE_URL}/analysis/${analysisId}/commit`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return await res.json();
//   } catch (error) {
//     console.error("Error marking analysis as committed:", error);
//     return { success: false };
//   }
// };

export const markAsCommitted = async (analysisId, token) => {
  try {
    const res = await fetch(`${API_BASE_URL}/analysis/${parseInt(analysisId, 10)}/commit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Error marking analysis as committed:", error);
    return { success: false };
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


// const API_URL = "http://localhost:3000"; // Backend URL

// ✅ Fetch repositories with auto-analysis enabled
export const fetchAutoAnalysisRepos = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/github/auto-analysis-repos`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching auto-analysis repositories:", error);
    return { success: false, message: "Failed to fetch repositories" };
  }
};



export const fetchRepoAnalysisHistory = async (owner, repo) => {
  try {
    const token = localStorage.getItem("token"); // Ensure token exists
    if (!token) {
      console.error("No token found in localStorage.");
      return { success: false, message: "Unauthorized request" };
    }

    const response = await axios.get(
      `http://localhost:3000/github/repo/${owner}/${repo}/analysis-history`,
      {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure Authorization header is sent
        // Remove withCredentials if backend does not support cookies
        // withCredentials: true, 
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching repo analysis history:", error.response?.data || error.message);
    return { success: false, message: "Failed to fetch analysis history" };
  }
};



export const fetchRepoErrors = async (owner, repo) =>{
    try{
      const token = localStorage.getItem("token");
      if(!token){
        console.error("No token found in the localStorage");
        return { success: false, message: "Unauthorised request"};
      }

      const respone = await axios.get(
        `http://localhost:3000/github/errors/${owner}/${repo}`,
        {
            headers: {Authorization: `Bearer ${token}`},
        }
      );

      return respone.data;

    }catch(error){
      console.error("Error fetching repo errors: ", error.response?.data || error.data);
      return { success: false, message: "Failed to fetch repo errors"};
    }
};





export const ignoreAnalysis = async (owner, repo, analysisId, token) => {
  const response = await fetch(`${API_BASE_URL}/analysis/ignored-analysis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      owner,
      repo,
      analysisId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to ignore analysis");
  }

  return await response.json();
};
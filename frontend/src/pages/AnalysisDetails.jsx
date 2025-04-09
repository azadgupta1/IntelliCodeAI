// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchAnalysisById } from "../services/githubServices";

// const AnalysisDetails = () => {
//   const { id } = useParams(); // Extract analysis ID from the URL
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("User not authenticated");
//         setLoading(false);
//         return;
//       }

//       const result = await fetchAnalysisById(id, token);
//       if (result.success) {
//         setAnalysis(result.data);
//       } else {
//         setError(result.message);
//       }
//       setLoading(false);
//     };

//     fetchDetails();
//   }, [id]);

//   if (loading) return <p className="text-center">Loading analysis details...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!analysis) return <p className="text-center">No analysis details found.</p>;

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-8">
//       <h2 className="text-xl font-semibold mb-4">Analysis Details</h2>

//       <p><strong>Commit Hash:</strong> {analysis.commitHash}</p>
//       <p><strong>File:</strong> {analysis.file ? analysis.file.filename : "No file associated"}</p>

//       <h3 className="mt-4 font-semibold">Analysis Results:</h3>
//       <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
//         {JSON.stringify(analysis.result, null, 2)}
//       </pre>
//     </div>
//   );
// };

// export default AnalysisDetails;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchAnalysisById,
//   fetchGithubRepoById,
//   fetchAIFixedCode,
//   commitFixedCodeToGitHub
// } from "../services/githubServices";
// import CodeEditor from "../components/CodeEditor";

// const AnalysisDetails = () => {
//   const { id } = useParams();
//   const [analysis, setAnalysis] = useState(null);
//   const [repo, setRepo] = useState(null);
//   const [fixedCode, setFixedCode] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [fixLoading, setFixLoading] = useState(false);
//   const [commitMessage, setCommitMessage] = useState("Apply AI fix");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("User not authenticated");
//           setLoading(false);
//           return;
//         }
  
//         const result = await fetchAnalysisById(id, token);
//         console.log("🔍 Analysis result:", result);
  
//         if (!result.success) {
//           setError(result.message);
//           setLoading(false);
//           return;
//         }
  
//         setAnalysis(result.data);
  
//         const repoInfo = await fetchGithubRepoById(result.data.githubRepoId, token);
//         console.log("📦 GitHub Repo Info:", repoInfo);
  
//         if (!repoInfo.success) {
//           setError(repoInfo.message);
//           setLoading(false);
//           return;
//         }
  
//         setRepo(repoInfo.data);
  
//         // Only try fetching fix if file is available
//         if (result.data.file) {
//           const owner = repoInfo.data.ownerName;
//           const repoName = repoInfo.data.repoName;
//           const commitSha = result.data.commitHash;
//           const filePath = result.data.file.filename;
  
//           console.log("🚀 Fetching AI Fix with:", {
//             owner,
//             repoName,
//             commitSha,
//             filePath
//           });
  
//           const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);
//           console.log("✅ AI Fix Result:", fixResult);
  
//           if (fixResult.success) {
//             setFixedCode(fixResult.fixedCode);
//           } else {
//             setError("Failed to fetch AI fixed code");
//           }
//         } else {
//           console.warn("⚠️ No file associated with analysis");
//         }
  
//         setLoading(false);
//       } catch (err) {
//         console.error("❌ Error fetching analysis details:", err);
//         setError("An unexpected error occurred.");
//         setLoading(false);
//       }
//     };
  
//     fetchDetails();
//   }, [id]);
  

//   const handleCommitFix = async () => {
//     if (!repo || !analysis || !fixedCode || !analysis.file) return;

//     const token = localStorage.getItem("token");
//     setFixLoading(true);

//     const commitResult = await commitFixedCodeToGitHub(
//       repo.owner,
//       repo.repo,
//       analysis.commitHash,
//       analysis.file.filename,
//       fixedCode,
//       token
//     );

//     if (commitResult.success) {
//       alert("✅ AI fix committed successfully!");
//     } else {
//       alert("❌ Failed to commit fix.");
//     }

//     setFixLoading(false);
//   };

//   if (loading) return <p className="text-center">Loading analysis details...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!analysis) return <p className="text-center">No analysis details found.</p>;

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md rounded-lg max-w-6xl mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-4">Analysis Details</h2>

//       <p><strong>Commit Hash:</strong> {analysis.commitHash}</p>
//       <p><strong>File:</strong> {analysis.file ? analysis.file.filename : "No file associated"}</p>

//       <h3 className="mt-4 font-semibold">Analysis Results:</h3>
//       <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
//         {JSON.stringify(analysis.result, null, 2)}
//       </pre>

//       {analysis.file && fixedCode && (
//         <div className="mt-6">
//           <h3 className="text-lg font-bold mb-2">Original Code</h3>
//           <CodeEditor code={analysis.file.content} readOnly />

//           <h3 className="text-lg font-bold mt-6 mb-2">AI Suggested Fix</h3>
//           <CodeEditor code={fixedCode} readOnly />

//           <button
//             onClick={handleCommitFix}
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//             disabled={fixLoading}
//           >
//             {fixLoading ? "Committing..." : "Commit AI Fix"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisDetails;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   fetchAnalysisById,
//   fetchGithubRepoById,
//   fetchAIFixedCode,
//   commitFixedCodeToGitHub,
// } from "../services/githubServices";
// import CodeEditor from "../components/CodeEditor";

// const AnalysisDetails = () => {
//   const { id } = useParams();
//   const [analysis, setAnalysis] = useState(null);
//   const [repo, setRepo] = useState(null);
//   const [fixedCode, setFixedCode] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [fixLoading, setFixLoading] = useState(false);
//   const [commitMessage, setCommitMessage] = useState("Apply AI fix");
//   const [error, setError] = useState("");
//   const [originalCode, setOriginalCode] = useState("");


//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("User not authenticated");
//           setLoading(false);
//           return;
//         }

//         const result = await fetchAnalysisById(id, token);
//         console.log("🔍 Analysis result:", result);

//         if (!result.success) {
//           setError(result.message);
//           setLoading(false);
//           return;
//         }

//         setAnalysis(result.data);

//         const repoInfo = await fetchGithubRepoById(result.data.githubRepoId, token);
//         console.log("📦 GitHub Repo Info:", repoInfo);

//         if (!repoInfo.success) {
//           setError(repoInfo.message);
//           setLoading(false);
//           return;
//         }

//         setRepo(repoInfo.data);

//         // Only try fetching fix if file is available
//         if (result.data.file) {
//           const repoName = repoInfo.data.repoName;
//           const repoUrl = repoInfo.data.repoUrl;
//           const owner = repoUrl.split("github.com/")[1]?.split("/")[0]; // Extract owner from URL
//           const commitSha = result.data.commitHash;
//           const filePath = result.data.file.filename;

//           console.log("🚀 Fetching AI Fix with:", {
//             owner,
//             repoName,
//             commitSha,
//             filePath,
//           });

//           const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);
//           console.log("✅ AI Fix Result:", fixResult);

//           if (fixResult.success) {
//             setFixedCode(fixResult.fixedCode);
//           } else {
//             setError("Failed to fetch AI fixed code");
//           }
//         } else {
//           console.warn("⚠️ No file associated with analysis");
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error("❌ Error fetching analysis details:", err);
//         setError("An unexpected error occurred.");
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id]);

//   const handleCommitFix = async () => {
//     if (!repo || !analysis || !fixedCode || !analysis.file) return;

//     const token = localStorage.getItem("token");
//     setFixLoading(true);

//     const repoName = repo.repoName;
//     const repoUrl = repo.repoUrl;
//     const owner = repoUrl.split("github.com/")[1]?.split("/")[0]; // Extract owner again here
//     const filePath = analysis.file.filename;
//     const commitSha = analysis.commitHash;

//     console.log("🛠️ Commit Info:", {
//       owner,
//       repo: repoName,
//       commitSha,
//       filePath,
//     });

//     const commitResult = await commitFixedCodeToGitHub(
//       owner,
//       repoName,
//       commitSha,
//       filePath,
//       fixedCode,
//       token
//     );

//     if (commitResult.success) {
//       alert("✅ AI fix committed successfully!");
//     } else {
//       console.error("❌ Commit failed:", commitResult);
//       alert("❌ Failed to commit fix.");
//     }

//     setFixLoading(false);
//   };

//   if (loading) return <p className="text-center">Loading analysis details...</p>;
//   if (error) return <p className="text-red-500 text-center">{error}</p>;
//   if (!analysis) return <p className="text-center">No analysis details found.</p>;

//   return (
//     <div className="p-6 bg-white dark:bg-gray-900 text-black dark:text-white shadow-md rounded-lg max-w-6xl mx-auto mt-8">
//       <h2 className="text-2xl font-semibold mb-4">Analysis Details</h2>

//       <p>
//         <strong>Commit Hash:</strong> {analysis.commitHash}
//       </p>
//       <p>
//         <strong>File:</strong>{" "}
//         {analysis.file ? analysis.file.filename : "No file associated"}
//       </p>

//       <h3 className="mt-4 font-semibold">Analysis Results:</h3>
//       <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
//         {JSON.stringify(analysis.result, null, 2)}
//       </pre>

//       {analysis.file && fixedCode && (
//         <div className="mt-6">
//           <h3 className="text-lg font-bold mb-2">Original Code</h3>
//           <CodeEditor code={analysis.file.content} readOnly />

//           <h3 className="text-lg font-bold mt-6 mb-2">AI Suggested Fix</h3>
//           <CodeEditor code={fixedCode} readOnly />

//           <button
//             onClick={handleCommitFix}
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
//             disabled={fixLoading}
//           >
//             {fixLoading ? "Committing..." : "Commit AI Fix"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisDetails;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAnalysisById,
  fetchGithubRepoById,
  fetchAIFixedCode,
  commitFixedCodeToGitHub,
} from "../services/githubServices";
import CodeEditor from "../components/CodeEditor";

const AnalysisDetails = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [repo, setRepo] = useState(null);
  const [fixedCode, setFixedCode] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [fixLoading, setFixLoading] = useState(false);
  const [commitMessage, setCommitMessage] = useState("Apply AI fix");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const result = await fetchAnalysisById(id, token);
        console.log("🔍 Analysis result:", result);

        if (!result.success) {
          setError(result.message);
          setLoading(false);
          return;
        }

        setAnalysis(result.data);

        const repoInfo = await fetchGithubRepoById(result.data.githubRepoId, token);
        console.log("📦 GitHub Repo Info:", repoInfo);

        if (!repoInfo.success) {
          setError(repoInfo.message);
          setLoading(false);
          return;
        }

        setRepo(repoInfo.data);

        // Only try fetching fix if file is available
        if (result.data.file) {
          const repoName = repoInfo.data.repoName;
          const repoUrl = repoInfo.data.repoUrl;
          const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
          const commitSha = result.data.commitHash;
          const filePath = result.data.file.filename;

          console.log("🚀 Fetching AI Fix with:", {
            owner,
            repoName,
            commitSha,
            filePath,
          });

          const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);
          console.log("✅ AI Fix Result:", fixResult);

          if (fixResult.success) {
            setFixedCode(fixResult.fixedCode);
            setOriginalCode(fixResult.originalCode); // ✅ Use AI response original
          } else {
            setError("Failed to fetch AI fixed code");
          }
        } else {
          console.warn("⚠️ No file associated with analysis");
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching analysis details:", err);
        setError("An unexpected error occurred.");
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleCommitFix = async () => {
    if (!repo || !analysis || !fixedCode || !analysis.file) return;

    const token = localStorage.getItem("token");
    setFixLoading(true);

    const repoName = repo.repoName;
    const repoUrl = repo.repoUrl;
    const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
    const filePath = analysis.file.filename;
    const commitSha = analysis.commitHash;

    console.log("🛠️ Commit Info:", {
      owner,
      repo: repoName,
      commitSha,
      filePath,
    });

    const commitResult = await commitFixedCodeToGitHub(
      owner,
      repoName,
      commitSha,
      filePath,
      fixedCode,
      token
    );

    if (commitResult.success) {
      alert("✅ AI fix committed successfully!");
    } else {
      console.error("❌ Commit failed:", commitResult);
      alert("❌ Failed to commit fix.");
    }

    setFixLoading(false);
  };

  if (loading) return <p className="text-center">Loading analysis details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!analysis) return <p className="text-center">No analysis details found.</p>;

  return (
    <div className="p-6 bg-white dark:bg-gray-900 text-blue dark:text-white shadow-md rounded-lg max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Analysis Details</h2>

      <p>
        <strong>Commit Hash:</strong> {analysis.commitHash}
      </p>
      <p>
        <strong>File:</strong>{" "}
        {analysis.file ? analysis.file.filename : "No file associated"}
      </p>

      <h3 className="mt-4 font-semibold">Analysis Results:</h3>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto text-sm">
        {JSON.stringify(analysis.result, null, 2)}
      </pre>

      {analysis.file && fixedCode && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Original Code</h3>
          <CodeEditor code={originalCode} readOnly />

          <h3 className="text-lg font-bold mt-6 mb-2">AI Suggested Fix</h3>
          <CodeEditor code={fixedCode} readOnly />

          <button
            onClick={handleCommitFix}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            disabled={fixLoading}
          >
            {fixLoading ? "Committing..." : "Commit AI Fix"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalysisDetails;

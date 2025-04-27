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
//   const [originalCode, setOriginalCode] = useState("");
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
//           const repoName = repoInfo.data.repoName;
//           const repoUrl = repoInfo.data.repoUrl;
//           const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
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
//             setOriginalCode(fixResult.originalCode); // ✅ Use AI response original
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
//     const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
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
//     <div className="p-6 bg-white dark:bg-gray-900 text-blue dark:text-white shadow-md rounded-lg max-w-6xl mx-auto mt-8">
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
//           <CodeEditor code={originalCode} readOnly />

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
        if (!result.success) {
          setError(result.message);
          setLoading(false);
          return;
        }

        setAnalysis(result.data);
        const repoInfo = await fetchGithubRepoById(result.data.githubRepoId, token);

        if (!repoInfo.success) {
          setError(repoInfo.message);
          setLoading(false);
          return;
        }

        setRepo(repoInfo.data);

        if (result.data.file) {
          const repoName = repoInfo.data.repoName;
          const repoUrl = repoInfo.data.repoUrl;
          const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
          const commitSha = result.data.commitHash;
          const filePath = result.data.file.filename;

          const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);

          if (fixResult.success) {
            setFixedCode(fixResult.fixedCode);
            setOriginalCode(fixResult.originalCode);
          } else {
            setError("Failed to fetch AI fixed code");
          }
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
      alert("❌ Failed to commit fix.");
    }

    setFixLoading(false);
  };

  if (loading) return <p className="text-center text-white">Loading analysis details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!analysis) return <p className="text-center text-white">No analysis details found.</p>;

  const result = analysis.result || {};

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🧠 Analysis Summary</h2>
      <div className="mb-6">
        <p><strong>Commit:</strong> {analysis.commitHash}</p>
        <p><strong>File:</strong> {analysis.file?.filename || "N/A"}</p>
      </div>

      <div className="space-y-8">
        {/* Errors */}
        {result.errors?.length > 0 && (
          <div>
            <h3 className="text-red-400 text-2xl font-bold mb-2">🛑 Critical Errors</h3>
            <div className="space-y-3">
              {result.errors.map((err, idx) => (
                <div key={idx} className="p-4 bg-red-900/40 border-l-4 border-red-500 rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-red-300 font-medium">{err.message}</p>
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                      {err.severity?.toUpperCase() || "ERROR"}
                    </span>
                  </div>
                  {err.line && <p className="text-xs text-red-200 mt-1">📍 Line: {err.line}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {result.suggestions?.length > 0 && (
          <div>
            <h3 className="text-yellow-300 text-2xl font-bold mb-2">💡 Suggestions</h3>
            <div className="space-y-3">
              {result.suggestions.map((sugg, idx) => (
                <div key={idx} className="p-4 bg-yellow-900/40 border-l-4 border-yellow-400 rounded-lg">
                  <p className="text-yellow-200 font-medium">{sugg.message}</p>
                  {sugg.line && <p className="text-xs text-yellow-100 mt-1">📍 Line: {sugg.line}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Optimizations */}
        {result.optimizations?.length > 0 && (
          <div>
            <h3 className="text-green-400 text-2xl font-bold mb-2">🚀 Optimizations</h3>
            <div className="space-y-3">
              {result.optimizations.map((opt, idx) => (
                <div key={idx} className="p-4 bg-green-900/40 border-l-4 border-green-500 rounded-lg">
                  <p className="text-green-200 font-medium">{opt.message}</p>
                  {opt.line && <p className="text-xs text-green-100 mt-1">📍 Line: {opt.line}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code Editor Section */}
{/* Code Comparison Section */}
{fixedCode && (
  <div className="mt-12">
    <h3 className="text-2xl font-semibold mb-6 text-white">🧪 AI Fix Preview</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Original Code */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4">
        <h4 className="text-lg font-medium text-red-400 mb-2">🔧 Original Code</h4>
        <CodeEditor code={originalCode} readOnly />
      </div>

      {/* AI Fixed Code */}
      <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg p-4">
        <h4 className="text-lg font-medium text-green-400 mb-2">🤖 AI Suggested Fix</h4>
        <CodeEditor code={fixedCode} readOnly />
      </div>
    </div>

    {/* Commit Button */}
    <div className="text-center mt-10">
    <button
  onClick={handleCommitFix}
  disabled={fixLoading}
  className={`relative overflow-hidden transition-all duration-300 transform bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:to-pink-600 text-white text-lg font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 ${
    fixLoading ? "opacity-60 cursor-not-allowed" : ""
  }`}
>
  {/* Glowing Star / Sparkle */}
  <span className="absolute top-1 left-1/2 w-4 h-4 bg-white rounded-full opacity-75 animate-ping"></span>
  <span className="absolute top-1 left-1/2 w-1 h-1 bg-white rounded-full"></span>

  {/* Gemini Icon (optional emoji or SVG) */}
  <span className="mr-2">♊</span>
  {fixLoading ? "⏳ Committing Fix..." : "Commit AI Fix to GitHub"}
</button>

    </div>
  </div>
)}

    </div>
  );
};

export default AnalysisDetails;


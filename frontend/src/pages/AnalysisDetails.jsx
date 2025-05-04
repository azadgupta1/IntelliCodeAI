import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAnalysisById,
  fetchGithubRepoById,
  fetchAIFixedCode,
  commitFixedCodeToGitHub,
  markAsCommitted,
} from "../services/githubServices";
import CodeEditor from "../components/CodeEditor";
import DiffViewer from "../components/DiffViewer";

const getLineContext = (code, line, context = 3) => {
  const lines = code.split("\n");
  const start = Math.max(0, line - context - 1);
  const end = Math.min(lines.length, line + context);
  return lines.slice(start, end).join("\n");
};

const AnalysisDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [repo, setRepo] = useState(null);
  const [fixedCode, setFixedCode] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [fixLoading, setFixLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCommitted, setIsCommitted] = useState(false);

  const numErrors = analysis?.result?.errors?.length || 0;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("⚠️ You must be logged in to view this page.");
          return;
        }

        setLoading(true);

        const result = await fetchAnalysisById(id, token);
        if (!result.success) {
          setError(result.message || "Failed to fetch analysis data.");
          return;
        }


        console.log("RESULT is : ",result);

        const analysisData = result.data;
        setAnalysis(analysisData);

        const repoInfo = await fetchGithubRepoById(analysisData.githubRepoId, token);
        if (!repoInfo.success) {
          setError(repoInfo.message || "Failed to fetch repo data.");
          return;
        }

        console.log(repoInfo);

        setRepo(repoInfo.data);

        if (analysisData.file) {
          const repoName = repoInfo.data.repoName;
          const repoUrl = repoInfo.data.repoUrl;
          const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
          const commitSha = analysisData.commitHash;
          const filePath = analysisData.file.filename;

          const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);

          console.log("Both CODES are here: ", fixResult);
          
          if (fixResult.success) {
            setFixedCode(fixResult.fixedCode);
            setOriginalCode(fixResult.originalCode);
          } else {
            setError("⚠️ Failed to fetch AI-fixed code.");
          }
        }
      } catch (err) {
        console.error(err);
        setError("❌ An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);



  const handleCommitFix = async () => {
    if (!repo || !analysis || !fixedCode || !analysis.file) return;
    const token = localStorage.getItem("token");
    setFixLoading(true);

    try {
      const repoName = repo.repoName;
      const repoUrl = repo.repoUrl;
      const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
      const filePath = analysis.file.filename;
      const commitSha = analysis.commitHash;
      const githubRepoId = analysis.githubRepoId;

      console.log(owner);

      const commitResult = await commitFixedCodeToGitHub(
        owner,
        repoName,
        commitSha,
        filePath,
        fixedCode,
        token,
        numErrors,
        githubRepoId
      );

      if (commitResult.success) {
        await markAsCommitted(analysis.id, token);
        setIsCommitted(true);
        alert("✅ AI fix committed successfully!");
        navigate(`/repositories/${owner}/${repoName}/issues`);
      } else {
        alert("❌ Failed to commit fix.");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong while committing.");
    } finally {
      setFixLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-white">Loading analysis details...</div>;
  if (error) return <div className="text-center py-10 text-red-400">{error}</div>;
  if (!analysis) return <div className="text-center py-10 text-white">No analysis found.</div>;

  const result = analysis.result || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1e1e1e] text-white px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900 shadow-md">
          <h1 className="text-3xl font-bold mb-4">🧠 Analysis Summary</h1>
          <p><span className="font-medium text-zinc-400">Commit:</span> {analysis.commitHash}</p>
          <p><span className="font-medium text-zinc-400">File:</span> {analysis.file?.filename || "N/A"}</p>
        </div>

        {/* Errors */}
        {result.errors?.length > 0 && (
          <div>
            <h2 className="text-2xl text-red-400 font-semibold mb-4">🛑 Critical Errors</h2>
            {result.errors.map((err, idx) => (
              <DiffViewer
                key={idx}
                oldValue={getLineContext(originalCode, err.line || 1)}
                newValue={getLineContext(fixedCode, err.line || 1)}
                title={`❌ ${err.message} (Line ${err.line || 1})`}
              />
            ))}
          </div>
        )}

        {/* Suggestions */}
        {result.suggestions?.length > 0 && (
          <div>
            <h2 className="text-2xl text-yellow-300 font-semibold mb-4">💡 Suggestions</h2>
            {result.suggestions.map((sugg, idx) => (
              <DiffViewer
                key={idx}
                oldValue={getLineContext(originalCode, sugg.line || 1)}
                newValue={getLineContext(fixedCode, sugg.line || 1)}
                title={`💡 ${sugg.message} (Line ${sugg.line || 1})`}
              />
            ))}
          </div>
        )}

        {/* Optimizations */}
        {result.optimizations?.length > 0 && (
          <div>
            <h2 className="text-2xl text-green-400 font-semibold mb-4">🚀 Optimizations</h2>
            {result.optimizations.map((opt, idx) => (
              <DiffViewer
                key={idx}
                oldValue={getLineContext(originalCode, opt.line || 1)}
                newValue={getLineContext(fixedCode, opt.line || 1)}
                title={`🚀 ${opt.message} (Line ${opt.line || 1})`}
              />
            ))}
          </div>
        )}

        {/* Code Comparison */}
        {fixedCode && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">🧪 AI Fix Preview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">🔧 Original Code</h3>
                <CodeEditor code={originalCode} readOnly />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">🤖 AI Suggested Fix</h3>
                <CodeEditor code={fixedCode} readOnly />
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={handleCommitFix}
                disabled={fixLoading || isCommitted}
                className={`inline-flex items-center gap-2 text-white text-lg font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 ${
                  fixLoading || isCommitted ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {fixLoading
                  ? "⏳ Committing..."
                  : isCommitted
                  ? "✅ Fix Committed"
                  : "♊ Commit AI Fix to GitHub"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisDetails;














// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   fetchAnalysisById,
//   fetchGithubRepoById,
//   fetchAIFixedCode,
//   commitFixedCodeToGitHub,
//   markAsCommitted,
// } from "../services/githubServices";
// import CodeEditor from "../components/CodeEditor";
// import DiffViewer from "../components/DiffViewer";

// const getLineContext = (code, line, context = 3) => {
//   const lines = code.split("\n");
//   const start = Math.max(0, line - context - 1);
//   const end = Math.min(lines.length, line + context);
//   return lines.slice(start, end).join("\n");
// };

// const AnalysisDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [analysis, setAnalysis] = useState(null);
//   const [repo, setRepo] = useState(null);
//   const [fixedCode, setFixedCode] = useState("");
//   const [originalCode, setOriginalCode] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [fixLoading, setFixLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isCommitted, setIsCommitted] = useState(false);

//   const numErrors = analysis?.result?.errors?.length || 0;

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("⚠️ You must be logged in to view this page.");
//           return;
//         }

//         setLoading(true);
//         const result = await fetchAnalysisById(id, token);

//         if (!result.success) {
//           setError(result.message || "Failed to fetch analysis data.");
//           return;
//         }

//         const analysisData = result.data;
//         setAnalysis(analysisData);
//         setFixedCode(analysisData.fixedCode || "");
//         setOriginalCode(analysisData.originalCode || "");
//         setIsCommitted(analysisData.isCommited || false);

//         if (analysisData.file) {
//           const repoInfo = await fetchGithubRepoById(analysisData.githubRepoId, token);
//           if (!repoInfo.success) {
//             setError(repoInfo.message || "Failed to fetch repo data.");
//             return;
//           }
//           setRepo(repoInfo.data);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("❌ An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id]);

//   const handleCommitFix = async () => {
//     if (!repo || !analysis || !fixedCode || !analysis.file) return;

//     const token = localStorage.getItem("token");
//     setFixLoading(true);

//     try {
//       const repoName = repo.repoName;
//       const repoUrl = repo.repoUrl;
//       const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
//       const filePath = analysis.file.filename;
//       const commitSha = analysis.commitHash;
//       const githubRepoId = analysis.githubRepoId;

//       const commitResult = await commitFixedCodeToGitHub(
//         owner,
//         repoName,
//         commitSha,
//         filePath,
//         fixedCode,
//         token,
//         numErrors,
//         githubRepoId
//       );

//       if (commitResult.success) {
//         await markAsCommitted(analysis.id, token);
//         setIsCommitted(true);
//         alert("✅ AI fix committed successfully!");
//         navigate(`/repositories/${owner}/${repoName}/issues`);
//       } else {
//         alert("❌ Failed to commit fix.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Something went wrong while committing.");
//     } finally {
//       setFixLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center py-10 text-white">Loading analysis details...</div>;
//   if (error) return <div className="text-center py-10 text-red-400">{error}</div>;
//   if (!analysis) return <div className="text-center py-10 text-white">No analysis found.</div>;

//   const result = analysis.result || {};
//   const isManualAnalysis = !analysis.file;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1e1e1e] text-white px-4 py-12">
//       <div className="max-w-6xl mx-auto space-y-10">
//         <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900 shadow-md">
//           <h1 className="text-3xl font-bold mb-4">🧠 Analysis Summary</h1>
//           <p><span className="font-medium text-zinc-400">Commit:</span> {analysis.commitHash}</p>
//           <p>
//             <span className="font-medium text-zinc-400">File:</span>{" "}
//             {analysis.file?.filename || "N/A"}
//           </p>
//           {isManualAnalysis && (
//             <div className="mt-2 inline-block text-sm text-green-400 bg-green-900 px-3 py-1 rounded-full">
//               ✅ Manually Analyzed
//             </div>
//           )}
//         </div>

//         {/* Errors */}
//         {result.errors?.length > 0 && (
//           <div>
//             <h2 className="text-2xl text-red-400 font-semibold mb-4">🛑 Critical Errors</h2>
//             {result.errors.map((err, idx) => (
//               <DiffViewer
//                 key={idx}
//                 oldValue={getLineContext(originalCode, err.line || 1)}
//                 newValue={getLineContext(fixedCode, err.line || 1)}
//                 title={`❌ ${err.message} (Line ${err.line || 1})`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Suggestions */}
//         {result.suggestions?.length > 0 && (
//           <div>
//             <h2 className="text-2xl text-yellow-300 font-semibold mb-4">💡 Suggestions</h2>
//             {result.suggestions.map((sugg, idx) => (
//               <DiffViewer
//                 key={idx}
//                 oldValue={getLineContext(originalCode, sugg.line || 1)}
//                 newValue={getLineContext(fixedCode, sugg.line || 1)}
//                 title={`💡 ${sugg.message} (Line ${sugg.line || 1})`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Optimizations */}
//         {result.optimizations?.length > 0 && (
//           <div>
//             <h2 className="text-2xl text-green-400 font-semibold mb-4">🚀 Optimizations</h2>
//             {result.optimizations.map((opt, idx) => (
//               <DiffViewer
//                 key={idx}
//                 oldValue={getLineContext(originalCode, opt.line || 1)}
//                 newValue={getLineContext(fixedCode, opt.line || 1)}
//                 title={`🚀 ${opt.message} (Line ${opt.line || 1})`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Code Comparison */}
//         {fixedCode && (
//           <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md p-6">
//             <h2 className="text-2xl font-bold mb-6">🧪 AI Fix Preview</h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-red-400 mb-2">🔧 Original Code</h3>
//                 <CodeEditor code={originalCode} readOnly />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-green-400 mb-2">🤖 AI Suggested Fix</h3>
//                 <CodeEditor code={fixedCode} readOnly />
//               </div>
//             </div>

//             {!isManualAnalysis && (
//               <div className="text-center mt-8">
//                 <button
//                   onClick={handleCommitFix}
//                   disabled={fixLoading || isCommitted}
//                   className={`inline-flex items-center gap-2 text-white text-lg font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 ${
//                     fixLoading || isCommitted ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {fixLoading
//                     ? "⏳ Committing..."
//                     : isCommitted
//                     ? "✅ Fix Committed"
//                     : "♊ Commit AI Fix to GitHub"}
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnalysisDetails;



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   fetchAnalysisById,
//   fetchGithubRepoById,
//   commitFixedCodeToGitHub,
//   markAsCommitted,
// } from "../services/githubServices";
// import CodeEditor from "../components/CodeEditor";
// import DiffViewer from "../components/DiffViewer";

// const getLineContext = (code, line, context = 3) => {
//   const lines = code?.split("\n") || [];
//   const start = Math.max(0, line - context - 1);
//   const end = Math.min(lines.length, line + context);
//   return lines.slice(start, end).join("\n");
// };

// const AnalysisDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [analysis, setAnalysis] = useState(null);
//   const [repo, setRepo] = useState(null);
//   const [fixedCode, setFixedCode] = useState(null);
//   const [originalCode, setOriginalCode] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [fixLoading, setFixLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [isCommitted, setIsCommitted] = useState(false);

//   const numErrors = analysis?.result?.errors?.length || 0;

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           setError("⚠️ You must be logged in to view this page.");
//           return;
//         }

//         setLoading(true);
//         const result = await fetchAnalysisById(id, token);

//         if (!result.success) {
//           setError(result.message || "Failed to fetch analysis data.");
//           return;
//         }

//         const analysisData = result.data;
//         setAnalysis(analysisData);
//         setFixedCode(analysisData.fixedCode ?? null);
//         setOriginalCode(analysisData.originalCode ?? null);
//         setIsCommitted(analysisData.isCommited || false);

//         if (analysisData.file) {
//           const repoInfo = await fetchGithubRepoById(analysisData.githubRepoId, token);
//           if (!repoInfo.success) {
//             setError(repoInfo.message || "Failed to fetch repo data.");
//             return;
//           }
//           setRepo(repoInfo.data);
//         }
//       } catch (err) {
//         console.error(err);
//         setError("❌ An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [id]);

//   const handleCommitFix = async () => {
//     if (!repo || !analysis || !fixedCode || !analysis.file) return;

//     const token = localStorage.getItem("token");
//     setFixLoading(true);

//     try {
//       const repoName = repo.repoName;
//       const repoUrl = repo.repoUrl;
//       const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
//       const filePath = analysis.file.filename;
//       const commitSha = analysis.commitHash;
//       const githubRepoId = analysis.githubRepoId;

//       const commitResult = await commitFixedCodeToGitHub(
//         owner,
//         repoName,
//         commitSha,
//         filePath,
//         fixedCode,
//         token,
//         numErrors,
//         githubRepoId
//       );

//       if (commitResult.success) {
//         await markAsCommitted(analysis.id, token);
//         setIsCommitted(true);
//         alert("✅ AI fix committed successfully!");
//         navigate(`/repositories/${owner}/${repoName}/issues`);
//       } else {
//         alert("❌ Failed to commit fix.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Something went wrong while committing.");
//     } finally {
//       setFixLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center py-10 text-white">Loading analysis details...</div>;
//   if (error) return <div className="text-center py-10 text-red-400">{error}</div>;
//   if (!analysis) return <div className="text-center py-10 text-white">No analysis found.</div>;

//   const result = analysis.result || {};
//   const isManualAnalysis = !analysis.file;
//   const canShowDiff = originalCode && fixedCode;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1e1e1e] text-white px-4 py-12">
//       <div className="max-w-6xl mx-auto space-y-10">
//         <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900 shadow-md">
//           <h1 className="text-3xl font-bold mb-4">🧠 Analysis Summary</h1>
//           <p><span className="font-medium text-zinc-400">Commit:</span> {analysis.commitHash}</p>
//           <p>
//             <span className="font-medium text-zinc-400">File:</span>{" "}
//             {analysis.file?.filename || "N/A"}
//           </p>
//           {isManualAnalysis && (
//             <div className="mt-2 inline-block text-sm text-green-400 bg-green-900 px-3 py-1 rounded-full">
//               ✅ Manually Analyzed
//             </div>
//           )}
//         </div>

//         {/* Errors */}
//         {result.errors?.length > 0 && canShowDiff && (
//           <div>
//             <h2 className="text-2xl text-red-400 font-semibold mb-4">🛑 Critical Errors</h2>
//             {result.errors.map((err, idx) => (
//               <DiffViewer
//                 key={idx}
//                 oldValue={getLineContext(originalCode, err.line || 1)}
//                 newValue={getLineContext(fixedCode, err.line || 1)}
//                 title={`❌ ${err.message} (Line ${err.line || 1})`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Suggestions */}
//         {result.suggestions?.length > 0 && canShowDiff && (
//           <div>
//             <h2 className="text-2xl text-yellow-300 font-semibold mb-4">💡 Suggestions</h2>
//             {result.suggestions.map((sugg, idx) => (
//               <DiffViewer
//                 key={idx}
//                 oldValue={getLineContext(originalCode, sugg.line || 1)}
//                 newValue={getLineContext(fixedCode, sugg.line || 1)}
//                 title={`💡 ${sugg.message} (Line ${sugg.line || 1})`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Optimizations */}
//         {result.optimizations?.length > 0 && canShowDiff && (
//           <div>
//             <h2 className="text-2xl text-green-400 font-semibold mb-4">🚀 Optimizations</h2>
//             {result.optimizations.map((opt, idx) => (
//               <DiffViewer
//                 key={idx}
//                 oldValue={getLineContext(originalCode, opt.line || 1)}
//                 newValue={getLineContext(fixedCode, opt.line || 1)}
//                 title={`🚀 ${opt.message} (Line ${opt.line || 1})`}
//               />
//             ))}
//           </div>
//         )}

//         {!canShowDiff && (
//           <div className="text-center text-yellow-400 text-lg">
//             ⚠️ Original or fixed code not available for this analysis.
//           </div>
//         )}

//         {/* Code Comparison */}
//         {canShowDiff && (
//           <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md p-6">
//             <h2 className="text-2xl font-bold mb-6">🧪 AI Fix Preview</h2>
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="text-lg font-semibold text-red-400 mb-2">🔧 Original Code</h3>
//                 <CodeEditor code={originalCode} readOnly />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-green-400 mb-2">🤖 AI Suggested Fix</h3>
//                 <CodeEditor code={fixedCode} readOnly />
//               </div>
//             </div>

//             {!isManualAnalysis && (
//               <div className="text-center mt-8">
//                 <button
//                   onClick={handleCommitFix}
//                   disabled={fixLoading || isCommitted}
//                   className={`inline-flex items-center gap-2 text-white text-lg font-semibold px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 ${
//                     fixLoading || isCommitted ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {fixLoading
//                     ? "⏳ Committing..."
//                     : isCommitted
//                     ? "✅ Fix Committed"
//                     : "♊ Commit AI Fix to GitHub"}
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AnalysisDetails;

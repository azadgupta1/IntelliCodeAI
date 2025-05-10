import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAnalysisById,
  fetchGithubRepoById,
  fetchAIFixedCode,
} from "../services/githubServices";
import AnalysisSummary from "../components/AnalysisSummary";
import ErrorSection from "../components/ErrorSection";
import SuggestionSection from "../components/SuggestionSection";
import OptimizationSection from "../components/OptimizationSection";
import CodeComparison from "../components/CodeComparison";

const tabs = [
  { id: "errors", label: "Errors" },
  { id: "suggestions", label: "Suggestions" },
  { id: "optimizations", label: "Optimizations" },
  { id: "comparison", label: "Code Comparison" },
];

const AnalysisDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [repo, setRepo] = useState(null);
  const [fixedCode, setFixedCode] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [manuallyAnalyzed, setManuallyAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("errors");

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

        const analysisData = result.data;

        console.log(analysisData);
        setAnalysis(analysisData);

        const repoInfo = await fetchGithubRepoById(analysisData.githubRepoId, token);
        if (!repoInfo.success) {
          setError(repoInfo.message || "Failed to fetch repo data.");
          return;
        }

        setRepo(repoInfo.data);

        if (analysisData.file) {
          const repoName = repoInfo.data.repoName;
          const repoUrl = repoInfo.data.repoUrl;
          const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
          const commitSha = analysisData.commitHash;
          const filePath = analysisData.file.filename;

          const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);

          if (fixResult.success) {
            setFixedCode(fixResult.fixedCode);
            setOriginalCode(fixResult.originalCode);
          } else {
            setError("⚠️ Failed to fetch AI-fixed code.");
          }
        } else if (!analysisData.fileId && analysisData.filePath) {
          setManuallyAnalyzed(true);
          setFixedCode(analysisData.fixedCode);
          setOriginalCode(analysisData.originalCode);
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

  const result = analysis?.result || {};

  if (loading) return <div className="text-center py-10 text-white">Loading analysis details...</div>;
  if (error) return <div className="text-center py-10 text-red-400">{error}</div>;
  if (!analysis) return <div className="text-center py-10 text-white">No analysis found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-black px-4 py-1">

      <div>
          <AnalysisSummary analysis={analysis} manuallyAnalyzed={manuallyAnalyzed} />
        </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        

        <div className="pt-4">
          
          {activeTab === "errors" && (
            <ErrorSection errors={result.errors} originalCode={originalCode} fixedCode={fixedCode} />
          )}
          {activeTab === "suggestions" && (
            <SuggestionSection
              suggestions={result.suggestions}
              originalCode={originalCode}
              fixedCode={fixedCode}
            />
          )}
          {activeTab === "optimizations" && (
            <OptimizationSection
              optimizations={result.optimizations}
              originalCode={originalCode}
              fixedCode={fixedCode}
            />
          )}
          {activeTab === "comparison" && fixedCode && (
            <CodeComparison
              originalCode={originalCode}
              fixedCode={fixedCode}
              manuallyAnalyzed={manuallyAnalyzed}
              analysis={analysis}
              repo={repo}
              navigate={navigate}
            />
          )}
        </div>
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
// } from "../services/githubServices";
// import AnalysisSummary from "../components/AnalysisSummary";
// import ErrorSection from "../components/ErrorSection";
// import SuggestionSection from "../components/SuggestionSection";
// import OptimizationSection from "../components/OptimizationSection";
// import CodeComparison from "../components/CodeComparison";


// const AnalysisDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [analysis, setAnalysis] = useState(null);
//   const [repo, setRepo] = useState(null);
//   const [fixedCode, setFixedCode] = useState("");
//   const [originalCode, setOriginalCode] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [manuallyAnalyzed, setManuallyAnalyzed] = useState(false);

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
        
//         const repoInfo = await fetchGithubRepoById(analysisData.githubRepoId, token);
//         if (!repoInfo.success) {
//           setError(repoInfo.message || "Failed to fetch repo data.");
//           return;
//         }
  
//         setRepo(repoInfo.data);
  
//         if (analysisData.file) {
//           const repoName = repoInfo.data.repoName;
//           const repoUrl = repoInfo.data.repoUrl;
//           const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
//           const commitSha = analysisData.commitHash;
//           const filePath = analysisData.file.filename;
  
//           const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);
  
//           if (fixResult.success) {
//             setFixedCode(fixResult.fixedCode);
//             setOriginalCode(fixResult.originalCode);
//           } else {
//             setError("⚠️ Failed to fetch AI-fixed code.");
//           }
//         } else if (!analysisData.fileId && analysisData.filePath) {
//           setManuallyAnalyzed(true);
//           setFixedCode(analysisData.fixedCode);
//           setOriginalCode(analysisData.originalCode);
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

//   if (loading) return <div className="text-center py-10 text-white">Loading analysis details...</div>;
//   if (error) return <div className="text-center py-10 text-red-400">{error}</div>;
//   if (!analysis) return <div className="text-center py-10 text-white">No analysis found.</div>;

//   const result = analysis.result || {};

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1e1e1e] text-white px-4 py-12">
//       <div className="max-w-6xl mx-auto space-y-10">
//         <AnalysisSummary 
//           analysis={analysis} 
//           manuallyAnalyzed={manuallyAnalyzed} 
//         />

//         <ErrorSection 
//           errors={result.errors} 
//           originalCode={originalCode} 
//           fixedCode={fixedCode} 
//         />

//         <SuggestionSection 
//           suggestions={result.suggestions} 
//           originalCode={originalCode} 
//           fixedCode={fixedCode} 
//         />

//         <OptimizationSection 
//           optimizations={result.optimizations} 
//           originalCode={originalCode} 
//           fixedCode={fixedCode} 
//         />

//         {fixedCode && (
//           <CodeComparison 
//             originalCode={originalCode} 
//             fixedCode={fixedCode} 
//             manuallyAnalyzed={manuallyAnalyzed} 
//             analysis={analysis} 
//             repo={repo} 
//             navigate={navigate} 
//           />
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
//   const [manuallyAnalyzed, setManuallyAnalyzed] = useState(false);

//   const numErrors = analysis?.result?.errors?.length || 0;

//   console.log("Analysis is : ",analysis);

//   // console.log("Fetching repo using ID:", analysisData.githubRepoId);


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
  
//         console.log("RESULT is : ", result);
  
//         const analysisData = result.data;
//         setAnalysis(analysisData);
        
//         console.log("Fetching repo using ID:", analysisData.githubRepoId);

//         const repoInfo = await fetchGithubRepoById(analysisData.githubRepoId, token);
//         if (!repoInfo.success) {
//           setError(repoInfo.message || "Failed to fetch repo data.");
//           return;
//         }

//         console.log("SET Error Log is : ",setError);
  
//         console.log("REPO INFO is : ",repoInfo);
  
//         setRepo(repoInfo.data);
  
//         // 👇 Determine how to get fixed/original code
//         if (analysisData.file) {
//           const repoName = repoInfo.data.repoName;
//           const repoUrl = repoInfo.data.repoUrl;
//           const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
//           const commitSha = analysisData.commitHash;
//           const filePath = analysisData.file.filename;
  
//           const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);
  
//           console.log("Both CODES are here: ", fixResult);
  
//           if (fixResult.success) {
//             setFixedCode(fixResult.fixedCode);
//             setOriginalCode(fixResult.originalCode);
//           } else {
//             setError("⚠️ Failed to fetch AI-fixed code.");
//           }
//         } else if (!analysisData.fileId && analysisData.filePath) {
//           // ✅ Handle case when fileId is null but filePath exists
//           setManuallyAnalyzed(true);
//           setFixedCode(analysisData.fixedCode);
//           setOriginalCode(analysisData.originalCode);
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

//       console.log(owner);

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

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1e1e1e] text-white px-4 py-12">
//       <div className="max-w-6xl mx-auto space-y-10">
//         <div className="border border-zinc-800 rounded-2xl p-6 bg-zinc-900 shadow-md">
//           <h1 className="text-3xl font-bold mb-4">🧠 Analysis Summary</h1>
//           <p><span className="font-medium text-zinc-400">Commit:</span> {analysis.commitHash}</p>
//           {/* <p><span className="font-medium text-zinc-400">File:</span> {analysis.file?.filename || "N/A"}</p> */}
//           <p>
//             <span className="font-medium text-zinc-400">File:</span>{" "}
//             {analysis.file?.filename || analysis.filePath || "N/A"}
//             {manuallyAnalyzed && (
//               <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-500 text-black">
//                  Manually Analyzed
//               </span>
//             )}
//           </p>

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

            

//             {!manuallyAnalyzed && (
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
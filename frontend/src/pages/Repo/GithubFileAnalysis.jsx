// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import DiffViewer from "../../components/DiffViewer";
// import CodeEditor from "../../components/CodeEditor";
// import { API_BASE_URL } from "../../services/githubServices";

// // Build nested file tree
// const buildFileTree = (paths) => {
//   const root = {};
//   paths.forEach((path) => {
//     const parts = path.split("/");
//     let current = root;
//     parts.forEach((part, index) => {
//       if (!current[part]) {
//         current[part] = index === parts.length - 1 ? null : {};
//       }
//       current = current[part];
//     });
//   });
//   return root;
// };

// // Tree UI component
// const FileTree = ({ tree, onFileClick, pathPrefix = "" }) => {
//   const [openNodes, setOpenNodes] = useState({});

//   const toggle = (key) => {
//     setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   return (
//     <ul className="ml-4 border-l border-gray-700">
//       {Object.entries(tree).map(([key, value]) => {
//         const fullPath = pathPrefix ? `${pathPrefix}/${key}` : key;
//         const isFolder = value !== null;
//         const isOpen = openNodes[key];

//         return (
//           <li key={fullPath} className="my-1">
//             <div
//               className={`cursor-pointer flex items-center justify-between px-2 py-1 rounded transition-colors ${
//                 isFolder
//                   ? "text-blue-400 hover:bg-blue-900"
//                   : "text-gray-300 hover:bg-gray-800"
//               }`}
//               onClick={() => (isFolder ? toggle(key) : onFileClick(fullPath))}
//             >
//               <span>{key}</span>
//               {isFolder && (
//                 <span className="text-xs">{isOpen ? "▾" : "▸"}</span>
//               )}
//             </div>
//             {isFolder && isOpen && (
//               <FileTree
//                 tree={value}
//                 onFileClick={onFileClick}
//                 pathPrefix={fullPath}
//               />
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// // Show nearby code lines
// const getLineContext = (code, line, context = 2) => {
//   if (!code) return "";
//   const lines = code.split("\n");
//   const start = Math.max(0, line - context - 1);
//   const end = Math.min(lines.length, line + context);
//   return lines.slice(start, end).join("\n");
// };

// const GithubFileAnalysis = () => {
//   const { owner, repo } = useParams();
//   const navigate = useNavigate();

//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState(null);
//   const [originalCode, setOriginalCode] = useState("");
//   const [fixedCode, setFixedCode] = useState("");
//   const [analyzing, setAnalyzing] = useState(false);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) throw new Error("Authentication token not found.");

//         const response = await axios.get(
//           `${API_BASE_URL}/github/repos/${owner}/${repo}/files`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setFiles(response.data.files || []);
//       } catch (err) {
//         setError("Error fetching repository files.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, [owner, repo]);


//   const analyzeFile = async (filePath) => {
//     try {
//       setSelectedFile(filePath);
//       setAnalysisResult(null);
//       setAnalyzing(true);
  
//       const token = localStorage.getItem("token");
  
//       const response = await axios.post(
//         `${API_BASE_URL}/github/repos/${owner}/${repo}/analyze`,
//         { filePath },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
  
//       console.log("Response:", response);
  
//       const { analysis } = response.data;
  
//       setAnalysisResult(analysis);
//       setOriginalCode(analysis.originalCode || "");
//       setFixedCode(analysis.fixedCode || "");
//     } catch (err) {
//       console.error(err);
//       setError("Error analyzing file. Try again.");
//     } finally {
//       setAnalyzing(false);
//     }
//   };
  

//   const fileTree = buildFileTree(files);

//   return (
//     <div className="bg-gray-950 text-white min-h-screen px-6 py-8">
//       <div className="max-w-5xl mx-auto bg-[#1e293b] rounded-xl p-6 shadow-lg">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="text-blue-400 hover:underline mb-6"
//         >
//           ← Back to Repositories
//         </button>

//         <h2 className="text-3xl font-bold mb-4">
//           {repo} – File Analysis Dashboard
//         </h2>

//         {loading && <p className="text-gray-400">Loading files...</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         {!loading && files.length > 0 && (
//           <div className="bg-[#334155] rounded p-4 mb-6">
//             <h3 className="text-lg font-semibold mb-2">Project File Tree</h3>
//             <FileTree tree={fileTree} onFileClick={analyzeFile} />
//           </div>
//         )}

//         {selectedFile && (
//           <div className="bg-[#1e293b] border border-gray-700 p-4 rounded">
//             <h3 className="text-lg font-semibold text-blue-400 mb-2">
//               Analyzing: {selectedFile}
//             </h3>

//             {analyzing ? (
//               <p className="text-gray-400">Analyzing...</p>
//             ) : analysisResult ? (
//               <div className="space-y-8 mt-4">
//                 {/* Errors */}
// {analysisResult.result?.errors?.length > 0 && (
//   <div>
//     <h2 className="text-2xl text-red-400 font-semibold mb-4">
//       🛑 Critical Errors
//     </h2>
//     {analysisResult.result.errors.map((err, idx) => (
//       <DiffViewer
//         key={idx}
//         oldValue={getLineContext(originalCode, err.line || 1)}
//         newValue={getLineContext(fixedCode, err.line || 1)}
//         title={`❌ ${err.message} (Line ${err.line || 1})`}
//       />
//     ))}
//   </div>
// )}

// {/* Suggestions */}
// {analysisResult.result?.suggestions?.length > 0 && (
//   <div>
//     <h2 className="text-2xl text-yellow-300 font-semibold mb-4">
//       💡 Suggestions
//     </h2>
//     {analysisResult.result.suggestions.map((sugg, idx) => (
//       <DiffViewer
//         key={idx}
//         oldValue={getLineContext(originalCode, sugg.line || 1)}
//         newValue={getLineContext(fixedCode, sugg.line || 1)}
//         title={`💡 ${sugg.message} (Line ${sugg.line || 1})`}
//       />
//     ))}
//   </div>
// )}

// {/* Optimizations */}
// {analysisResult.result?.optimizations?.length > 0 && (
//   <div>
//     <h2 className="text-2xl text-green-400 font-semibold mb-4">
//       🚀 Optimizations
//     </h2>
//     {analysisResult.result.optimizations.map((opt, idx) => (
//       <DiffViewer
//         key={idx}
//         oldValue={getLineContext(originalCode, opt.line || 1)}
//         newValue={getLineContext(fixedCode, opt.line || 1)}
//         title={`🚀 ${opt.message} (Line ${opt.line || 1})`}
//       />
//     ))}
//   </div>
// )}


//                 {/* Final Code Comparison */}
//                 {fixedCode && (
//                   <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md p-6">
//                     <h2 className="text-2xl font-bold mb-6">🧪 AI Fix Preview</h2>
//                     <div className="grid md:grid-cols-2 gap-6">
//                       <div>
//                         <h3 className="text-lg font-semibold text-red-400 mb-2">
//                           🔧 Original Code
//                         </h3>
//                         <CodeEditor code={originalCode} readOnly />
//                       </div>
//                       <div>
//                         <h3 className="text-lg font-semibold text-green-400 mb-2">
//                           🤖 AI Suggested Fix
//                         </h3>
//                         <CodeEditor code={fixedCode} readOnly />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <p>No analysis result available.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GithubFileAnalysis;



























// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import DiffViewer from "../../components/DiffViewer";
// import CodeEditor from "../../components/CodeEditor";
// import { API_BASE_URL } from "../../services/githubServices";

// /* -------------------- File Tree Utils -------------------- */
// const buildFileTree = (paths) => {
//   const root = {};
//   paths.forEach((path) => {
//     path.split("/").reduce((acc, part, idx, arr) => {
//       if (!acc[part]) acc[part] = idx === arr.length - 1 ? null : {};
//       return acc[part];
//     }, root);
//   });
//   return root;
// };

// const FileTree = ({ tree, onSelect, prefix = "" }) => {
//   const [open, setOpen] = useState({});

//   return (
//     <ul className="space-y-1">
//       {Object.entries(tree).map(([name, value]) => {
//         const fullPath = prefix ? `${prefix}/${name}` : name;
//         const isFolder = value !== null;

//         return (
//           <li key={fullPath}>
//             <button
//               onClick={() =>
//                 isFolder
//                   ? setOpen({ ...open, [fullPath]: !open[fullPath] })
//                   : onSelect(fullPath)
//               }
//               className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm
//                 ${
//                   isFolder
//                     ? "font-medium text-slate-700 hover:bg-slate-100"
//                     : "text-slate-600 hover:bg-slate-100"
//                 }`}
//             >
//               <span className="truncate">{name}</span>
//               {isFolder && (
//                 <span className="text-xs text-slate-400">
//                   {open[fullPath] ? "–" : "+"}
//                 </span>
//               )}
//             </button>

//             {isFolder && open[fullPath] && (
//               <div className="ml-4 border-l border-slate-200 pl-2 mt-1">
//                 <FileTree
//                   tree={value}
//                   onSelect={onSelect}
//                   prefix={fullPath}
//                 />
//               </div>
//             )}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// /* -------------------- Helpers -------------------- */
// const getLineContext = (code, line, ctx = 2) => {
//   if (!code) return "";
//   const lines = code.split("\n");
//   return lines.slice(Math.max(0, line - ctx - 1), line + ctx).join("\n");
// };

// /* -------------------- Page -------------------- */
// const GithubFileAnalysis = () => {
//   const { owner, repo } = useParams();
//   const navigate = useNavigate();

//   const [files, setFiles] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [analysis, setAnalysis] = useState(null);
//   const [originalCode, setOriginalCode] = useState("");
//   const [fixedCode, setFixedCode] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [analyzing, setAnalyzing] = useState(false);
//   const [error, setError] = useState("");

//   /* -------------------- Fetch Files -------------------- */
//   useEffect(() => {
//     const load = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `${API_BASE_URL}/github/repos/${owner}/${repo}/files`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setFiles(res.data.files || []);
//       } catch {
//         setError("Unable to load repository files.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [owner, repo]);

//   /* -------------------- Analyze File -------------------- */
//   const analyzeFile = async (filePath) => {
//     try {
//       setSelectedFile(filePath);
//       setAnalyzing(true);
//       setAnalysis(null);

//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `${API_BASE_URL}/github/repos/${owner}/${repo}/analyze`,
//         { filePath },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setAnalysis(res.data.analysis);
//       setOriginalCode(res.data.analysis.originalCode || "");
//       setFixedCode(res.data.analysis.fixedCode || "");
//     } catch {
//       setError("Analysis failed.");
//     } finally {
//       setAnalyzing(false);
//     }
//   };

//   const tree = buildFileTree(files);

//   /* -------------------- UI -------------------- */
//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <header className="border-b border-slate-200">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div>
//             <button
//               onClick={() => navigate(-1)}
//               className="text-sm text-slate-500 hover:text-slate-700"
//             >
//               ← Back
//             </button>
//             <h1 className="text-2xl font-semibold text-slate-900 mt-1">
//               {repo}
//             </h1>
//             <p className="text-sm text-slate-500">
//               File-level AI Code Analysis
//             </p>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6">
//         {/* Sidebar */}
//         <aside className="col-span-3 border border-slate-200 rounded-xl p-4 h-[calc(100vh-160px)] overflow-y-auto">
//           <h3 className="text-sm font-semibold text-slate-700 mb-3">
//             Repository Files
//           </h3>
//           {loading ? (
//             <p className="text-sm text-slate-400">Loading files…</p>
//           ) : (
//             <FileTree tree={tree} onSelect={analyzeFile} />
//           )}
//         </aside>

//         {/* Workspace */}
//         <section className="col-span-9 border border-slate-200 rounded-xl p-6 overflow-y-auto">
//           {!selectedFile && (
//             <div className="h-full flex items-center justify-center text-slate-400 text-sm">
//               Select a file to start analysis
//             </div>
//           )}

//           {selectedFile && (
//             <>
//               <h2 className="text-lg font-semibold text-slate-900 mb-1">
//                 {selectedFile}
//               </h2>
//               <p className="text-sm text-slate-500 mb-6">
//                 AI-powered static analysis and improvements
//               </p>

//               {analyzing && (
//                 <p className="text-sm text-slate-500">Analyzing…</p>
//               )}

//               {analysis && (
//                 <div className="space-y-10">
//                   {/* Errors */}
//                   {analysis.result?.errors?.length > 0 && (
//                     <div>
//                       <h3 className="text-red-600 font-semibold mb-3">
//                         Critical Issues
//                       </h3>
//                       {analysis.result.errors.map((e, i) => (
//                         <DiffViewer
//                           key={i}
//                           title={e.message}
//                           oldValue={getLineContext(originalCode, e.line)}
//                           newValue={getLineContext(fixedCode, e.line)}
//                         />
//                       ))}
//                     </div>
//                   )}

//                   {/* Suggestions */}
//                   {analysis.result?.suggestions?.length > 0 && (
//                     <div>
//                       <h3 className="text-amber-600 font-semibold mb-3">
//                         Suggestions
//                       </h3>
//                       {analysis.result.suggestions.map((s, i) => (
//                         <DiffViewer
//                           key={i}
//                           title={s.message}
//                           oldValue={getLineContext(originalCode, s.line)}
//                           newValue={getLineContext(fixedCode, s.line)}
//                         />
//                       ))}
//                     </div>
//                   )}

//                   {/* Final Preview */}
//                   {fixedCode && (
//                     <div>
//                       <h3 className="font-semibold text-slate-900 mb-4">
//                         AI Fix Preview
//                       </h3>
//                       <div className="grid grid-cols-2 gap-6">
//                         <CodeEditor code={originalCode} readOnly />
//                         <CodeEditor code={fixedCode} readOnly />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default GithubFileAnalysis;












import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DiffViewer from "../../components/DiffViewer";
import CodeEditor from "../../components/CodeEditor";
import { API_BASE_URL } from "../../services/githubServices";

/* -------------------- File Tree Utils -------------------- */
const buildFileTree = (paths) => {
  const root = {};
  paths.forEach((path) => {
    path.split("/").reduce((acc, part, idx, arr) => {
      if (!acc[part]) acc[part] = idx === arr.length - 1 ? null : {};
      return acc[part];
    }, root);
  });
  return root;
};

const FileTree = ({ tree, onSelect, prefix = "" }) => {
  const [open, setOpen] = useState({});

  return (
    <ul className="space-y-1 text-sm">
      {Object.entries(tree).map(([name, value]) => {
        const fullPath = prefix ? `${prefix}/${name}` : name;
        const isFolder = value !== null;

        return (
          <li key={fullPath}>
            <button
              onClick={() =>
                isFolder
                  ? setOpen({ ...open, [fullPath]: !open[fullPath] })
                  : onSelect(fullPath)
              }
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md
                ${
                  isFolder
                    ? "font-medium text-slate-700 hover:bg-slate-200"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
            >
              <span className="truncate">{name}</span>
              {isFolder && (
                <span className="text-xs text-slate-400">
                  {open[fullPath] ? "–" : "+"}
                </span>
              )}
            </button>

            {isFolder && open[fullPath] && (
              <div className="ml-4 border-l border-slate-300 pl-3 mt-1">
                <FileTree
                  tree={value}
                  onSelect={onSelect}
                  prefix={fullPath}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

/* -------------------- Helpers -------------------- */
const getLineContext = (code, line, ctx = 2) => {
  if (!code) return "";
  const lines = code.split("\n");
  return lines.slice(Math.max(0, line - ctx - 1), line + ctx).join("\n");
};

/* -------------------- Page -------------------- */
const GithubFileAnalysis = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [originalCode, setOriginalCode] = useState("");
  const [fixedCode, setFixedCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${API_BASE_URL}/github/repos/${owner}/${repo}/files`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFiles(res.data.files || []);
      } catch {
        setError("Unable to load repository files.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [owner, repo]);

  const analyzeFile = async (filePath) => {
    try {
      setSelectedFile(filePath);
      setAnalyzing(true);
      setAnalysis(null);

      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/github/repos/${owner}/${repo}/analyze`,
        { filePath },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAnalysis(res.data.analysis);
      setOriginalCode(res.data.analysis.originalCode || "");
      setFixedCode(res.data.analysis.fixedCode || "");
    } catch {
      setError("Analysis failed.");
    } finally {
      setAnalyzing(false);
    }
  };

  const tree = buildFileTree(files);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-slate-500 hover:text-slate-700"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-semibold text-slate-900 mt-1">
            {repo}
          </h1>
          <p className="text-sm text-slate-500">
            File-level AI Code Analysis
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3 bg-slate-100 border border-slate-200 rounded-xl p-4 h-[calc(100vh-160px)] overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-500 uppercase mb-3">
            Repository Files
          </h3>

          {loading ? (
            <p className="text-sm text-slate-400">Loading files…</p>
          ) : (
            <FileTree tree={tree} onSelect={analyzeFile} />
          )}
        </aside>

        {/* Workspace */}
        <section className="col-span-9 bg-white border border-slate-200 rounded-xl p-6 overflow-y-auto">
          {!selectedFile && (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">
              Select a file from the left to start analysis
            </div>
          )}

          {selectedFile && (
            <>
              <h2 className="text-lg font-semibold text-slate-900">
                {selectedFile}
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                AI-powered static analysis results
              </p>

              {analyzing && (
                <p className="text-sm text-slate-500">Analyzing…</p>
              )}

              {analysis && (
                <div className="space-y-10">
                  {/* Errors */}
                  {analysis.result?.errors?.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                      <h3 className="text-red-600 font-semibold mb-4">
                        Critical Issues
                      </h3>
                      {analysis.result.errors.map((e, i) => (
                        <div key={i} className="mb-6">
                          <DiffViewer
                            title={e.message}
                            oldValue={getLineContext(originalCode, e.line)}
                            newValue={getLineContext(fixedCode, e.line)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {analysis.result?.suggestions?.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                      <h3 className="text-amber-700 font-semibold mb-4">
                        Suggestions
                      </h3>
                      {analysis.result.suggestions.map((s, i) => (
                        <div key={i} className="mb-6">
                          <DiffViewer
                            title={s.message}
                            oldValue={getLineContext(originalCode, s.line)}
                            newValue={getLineContext(fixedCode, s.line)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Final Preview */}
                  {fixedCode && (
                    <div className="border border-slate-200 rounded-lg overflow-hidden">
                      <div className="bg-slate-900 px-5 py-3">
                        <h3 className="text-white font-semibold">
                          AI Fix Preview
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-6 p-6 bg-slate-950">
                        <CodeEditor code={originalCode} readOnly />
                        <CodeEditor code={fixedCode} readOnly />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default GithubFileAnalysis;




















  // const analyzeFile = async (filePath) => {
  //   try {
  //     setSelectedFile(filePath);
  //     setAnalysisResult(null);
  //     setAnalyzing(true);
  //     const token = localStorage.getItem("token");

  //     const response = await axios.post(
  //       `http://localhost:3000/github/repos/${owner}/${repo}/analyze`,
  //       { filePath },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     console.log(response);

  //     const { analysis, originalCode, fixedCode } = response.data;

  //     setAnalysisResult(analysis);
  //     setOriginalCode(originalCode || "");
  //     setFixedCode(fixedCode || "");
  //   } catch (err) {
  //     setError("Error analyzing file. Try again.");
  //   } finally {
  //     setAnalyzing(false);
  //   }
  // };
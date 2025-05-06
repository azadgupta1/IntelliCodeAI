import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DiffViewer from "../../components/DiffViewer";
import CodeEditor from "../../components/CodeEditor";

// Build nested file tree
const buildFileTree = (paths) => {
  const root = {};
  paths.forEach((path) => {
    const parts = path.split("/");
    let current = root;
    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = index === parts.length - 1 ? null : {};
      }
      current = current[part];
    });
  });
  return root;
};

// Tree UI component
const FileTree = ({ tree, onFileClick, pathPrefix = "" }) => {
  const [openNodes, setOpenNodes] = useState({});

  const toggle = (key) => {
    setOpenNodes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ul className="ml-4 border-l border-gray-700">
      {Object.entries(tree).map(([key, value]) => {
        const fullPath = pathPrefix ? `${pathPrefix}/${key}` : key;
        const isFolder = value !== null;
        const isOpen = openNodes[key];

        return (
          <li key={fullPath} className="my-1">
            <div
              className={`cursor-pointer flex items-center justify-between px-2 py-1 rounded transition-colors ${
                isFolder
                  ? "text-blue-400 hover:bg-blue-900"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              onClick={() => (isFolder ? toggle(key) : onFileClick(fullPath))}
            >
              <span>{key}</span>
              {isFolder && (
                <span className="text-xs">{isOpen ? "▾" : "▸"}</span>
              )}
            </div>
            {isFolder && isOpen && (
              <FileTree
                tree={value}
                onFileClick={onFileClick}
                pathPrefix={fullPath}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

// Show nearby code lines
const getLineContext = (code, line, context = 2) => {
  if (!code) return "";
  const lines = code.split("\n");
  const start = Math.max(0, line - context - 1);
  const end = Math.min(lines.length, line + context);
  return lines.slice(start, end).join("\n");
};

const GithubFileAnalysis = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [originalCode, setOriginalCode] = useState("");
  const [fixedCode, setFixedCode] = useState("");
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        const response = await axios.get(
          `http://localhost:3000/github/repos/${owner}/${repo}/files`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setFiles(response.data.files || []);
      } catch (err) {
        setError("Error fetching repository files.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [owner, repo]);

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


  const analyzeFile = async (filePath) => {
    try {
      setSelectedFile(filePath);
      setAnalysisResult(null);
      setAnalyzing(true);
  
      const token = localStorage.getItem("token");
  
      const response = await axios.post(
        `http://localhost:3000/github/repos/${owner}/${repo}/analyze`,
        { filePath },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      console.log("Response:", response);
  
      const { analysis } = response.data;
  
      setAnalysisResult(analysis);
      setOriginalCode(analysis.originalCode || "");
      setFixedCode(analysis.fixedCode || "");
    } catch (err) {
      console.error(err);
      setError("Error analyzing file. Try again.");
    } finally {
      setAnalyzing(false);
    }
  };
  

  const fileTree = buildFileTree(files);

  return (
    <div className="bg-[#0f172a] text-white min-h-screen px-6 py-8">
      <div className="max-w-5xl mx-auto bg-[#1e293b] rounded-xl p-6 shadow-lg">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-400 hover:underline mb-6"
        >
          ← Back to Repositories
        </button>

        <h2 className="text-3xl font-bold mb-4">
          {repo} – File Analysis Dashboard
        </h2>

        {loading && <p className="text-gray-400">Loading files...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && files.length > 0 && (
          <div className="bg-[#334155] rounded p-4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Project File Tree</h3>
            <FileTree tree={fileTree} onFileClick={analyzeFile} />
          </div>
        )}

        {selectedFile && (
          <div className="bg-[#1e293b] border border-gray-700 p-4 rounded">
            <h3 className="text-lg font-semibold text-blue-400 mb-2">
              Analyzing: {selectedFile}
            </h3>

            {analyzing ? (
              <p className="text-gray-400">Analyzing...</p>
            ) : analysisResult ? (
              <div className="space-y-8 mt-4">
                {/* Errors */}
{analysisResult.result?.errors?.length > 0 && (
  <div>
    <h2 className="text-2xl text-red-400 font-semibold mb-4">
      🛑 Critical Errors
    </h2>
    {analysisResult.result.errors.map((err, idx) => (
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
{analysisResult.result?.suggestions?.length > 0 && (
  <div>
    <h2 className="text-2xl text-yellow-300 font-semibold mb-4">
      💡 Suggestions
    </h2>
    {analysisResult.result.suggestions.map((sugg, idx) => (
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
{analysisResult.result?.optimizations?.length > 0 && (
  <div>
    <h2 className="text-2xl text-green-400 font-semibold mb-4">
      🚀 Optimizations
    </h2>
    {analysisResult.result.optimizations.map((opt, idx) => (
      <DiffViewer
        key={idx}
        oldValue={getLineContext(originalCode, opt.line || 1)}
        newValue={getLineContext(fixedCode, opt.line || 1)}
        title={`🚀 ${opt.message} (Line ${opt.line || 1})`}
      />
    ))}
  </div>
)}


                {/* Final Code Comparison */}
                {fixedCode && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-6">🧪 AI Fix Preview</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-red-400 mb-2">
                          🔧 Original Code
                        </h3>
                        <CodeEditor code={originalCode} readOnly />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-2">
                          🤖 AI Suggested Fix
                        </h3>
                        <CodeEditor code={fixedCode} readOnly />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p>No analysis result available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GithubFileAnalysis;

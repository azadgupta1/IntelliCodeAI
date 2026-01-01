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
          <h1 className="text-2xl font-bold text-slate-900 m-2">
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

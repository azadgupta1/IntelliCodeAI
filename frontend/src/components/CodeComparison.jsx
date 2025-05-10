import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import {
  commitFixedCodeToGitHub,
  markAsCommitted,
} from "../services/githubServices";

const CodeComparison = ({ 
  originalCode, 
  fixedCode, 
  manuallyAnalyzed, 
  analysis, 
  repo, 
  navigate 
}) => {
  const [fixLoading, setFixLoading] = useState(false);
  const [isCommitted, setIsCommitted] = useState(false);

  const numErrors = analysis?.result?.errors?.length || 0;

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

  return (
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

      {!manuallyAnalyzed && (
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
      )}
    </div>
  );
};

export default CodeComparison;
import React from "react";

function RepositoryItem({ repo, onManualAnalyze, onAutoAnalyze }) {
  return (
    <div className="border p-3 mb-2 rounded shadow-md flex justify-between items-center bg-white">
      <div>
        <h3 className="text-xl font-semibold">{repo.repoName}</h3>
        <p className="text-gray-500">{repo.repoUrl}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => onManualAnalyze(repo)}
        >
          📄 Analyze Manually
        </button>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => onAutoAnalyze(repo)}
        >
          🔔 Enable Auto-Analysis
        </button>
      </div>
    </div>
  );
}

export default RepositoryItem;

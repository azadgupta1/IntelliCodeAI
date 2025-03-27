import React from "react";
import RepositoryItem from "./RepositoryItem";

function RepositoryList({ repositories, onManualAnalyze, onAutoAnalyze }) {
  if (repositories.length === 0) {
    return <p>No repositories found.</p>;
  }

  return (
    <div className="mt-5">
      {repositories.map((repo) => (
        <RepositoryItem
          key={repo.repoUrl}
          repo={repo}
          onManualAnalyze={onManualAnalyze}
          onAutoAnalyze={onAutoAnalyze}
        />
      ))}
    </div>
  );
}

export default RepositoryList;

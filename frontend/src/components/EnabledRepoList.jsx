import React from "react";

const EnabledRepoList = ({ enabledRepos, onSelect }) => {
  if (enabledRepos.length === 0) return <p>No auto-analyzed repositories found.</p>;

  return (
    <div>
      <h3 className="font-semibold mb-2">Select a repository:</h3>
      <ul className="flex flex-wrap gap-3">
        {enabledRepos.map((repo) => (
          <li
            key={repo.repoName}
            className="cursor-pointer bg-blue-100 text-blue-800 px-4 py-2 rounded-md shadow hover:bg-blue-200 transition"
            onClick={() => onSelect(repo.ownerName, repo.repoName)}
          >
            📂 {repo.repoName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnabledRepoList;

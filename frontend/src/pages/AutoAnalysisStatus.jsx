import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAutoAnalysisRepos, fetchRepoAnalysisHistory } from "../services/githubServices";

const AutoAnalysisStatus = () => {
  const [repos, setRepos] = useState([]); // List of repos with auto-analysis enabled
  const [selectedRepo, setSelectedRepo] = useState(null); // Selected repo for viewing analysis
  const [analyses, setAnalyses] = useState([]); // Analysis results for selected repo
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchAutoAnalysisRepos(token);
      if (data.success) {
        setRepos(data.repositories);
      }
    };

    fetchRepos();
  }, []);

  const handleRepoClick = async (owner, repo) => {
    setSelectedRepo(repo);
    const token = localStorage.getItem("token");
    const data = await fetchRepoAnalysisHistory(owner, repo, token);
    if (data.success) {
      setAnalyses(data.analyses || []); // Ensure analyses is always an array
    } else {
      setAnalyses([]);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">🔍 Auto-Analysis Status</h2>

      {repos.length === 0 ? (
        <p>No auto-analyzed repositories found.</p>
      ) : (
        <div>
          <h3 className="font-semibold">Select a repository:</h3>
          <ul className="mb-4">
            {repos.map(repo => (
              <li
                key={repo.repoName}
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={() => handleRepoClick(repo.ownerName, repo.repoName)}
              >
                📂 {repo.repoName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRepo && (
        <div className="border border-gray-300 rounded-md p-4 mt-4">
          <h3 className="font-semibold">Analysis Results for {selectedRepo}:</h3>

          {analyses.length === 0 ? (
            <p>No analysis data available.</p>
          ) : (
            <ul>
              {analyses.map((analysis, index) => (
                <li key={index} className="p-2 border rounded-md my-2">
                  <p><strong>Commit:</strong> {analysis.commitHash}</p>
                  <p><strong>Analyzed Files:</strong> {analysis.files ? analysis.files.length : 0}</p>

                  <button
                    className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
                    onClick={() => navigate(`/analysis/${analysis.id}`)}
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoAnalysisStatus;

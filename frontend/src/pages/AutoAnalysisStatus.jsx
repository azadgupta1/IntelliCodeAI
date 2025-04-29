import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAutoAnalysisRepos, fetchRepoAnalysisHistory } from "../services/githubServices";
import { formatDistanceToNow } from "date-fns";
import { FolderOpen, FileCode2, Clock } from "lucide-react";

const AutoAnalysisStatus = () => {
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchAutoAnalysisRepos(token);
      if (data.success) setRepos(data.repositories);
    };

    fetchRepos();
  }, []);

  const handleRepoClick = async (owner, repo) => {
    setSelectedRepo(repo);
    const token = localStorage.getItem("token");
    const data = await fetchRepoAnalysisHistory(owner, repo, token);
    if (data.success) setAnalyses(data.analyses || []);
    else setAnalyses([]);
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-5xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🔍 Auto-Analysis Overview</h2>

      {repos.length === 0 ? (
        <p className="text-gray-600">No auto-analyzed repositories found.</p>
      ) : (
        <div>
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Select a repository:</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <li
                key={repo.repoName}
                className="flex items-center gap-2 p-3 bg-gray-100 hover:bg-blue-50 cursor-pointer rounded-md shadow-sm transition"
                onClick={() => handleRepoClick(repo.ownerName, repo.repoName)}
              >
                <FolderOpen className="w-5 h-5 text-blue-500" />
                <span className="text-blue-700 font-medium">{repo.repoName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedRepo && (
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Analysis History: <span className="text-blue-600">{selectedRepo}</span>
          </h3>

          {analyses.length === 0 ? (
            <p className="text-gray-600">No analysis records available yet.</p>
          ) : (
            <ul className="space-y-4">
              {analyses.map((analysis, index) => (
                <li
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <FileCode2 className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-800">
                          {analysis.file?.filename || "Unnamed File"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Analyzed {formatDistanceToNow(new Date(analysis.createdAt))} ago</span>
                      </div>
                    </div>

                    <button
                      className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 text-sm font-medium"
                      onClick={() => navigate(`/analysis/${analysis.id}`)}
                    >
                      View Details ok →
                    </button>
                  </div>
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


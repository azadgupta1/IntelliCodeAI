import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepoAnalysisHistory } from "../services/githubServices";

const RepoAnalysisPage = () => {
  const { owner, repo } = useParams();
  const [analyses, setAnalyses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchRepoAnalysisHistory(owner, repo, token);

      if (data.success) {
        setAnalyses(data.analyses || []);
      } else {
        setAnalyses([]);
      }
    };

    fetchData();
  }, [owner, repo]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Analysis Results for {repo}:</h2>
      {analyses.length === 0 ? (
        <p>No analysis data available.</p>
      ) : (
        <ul className="space-y-4">
          {analyses.map((analysis, index) => (
            <li key={index} className="p-4 border rounded-md shadow">
              <p><strong>Commit:</strong> {analysis.commitHash}</p>
              <p><strong>Analyzed Files:</strong> {analysis.files?.length || 0}</p>
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
  );
};

export default RepoAnalysisPage;

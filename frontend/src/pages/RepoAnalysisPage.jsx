import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepoAnalysisHistory } from "../services/githubServices";
import { Loader } from "../components/ui/loader";

const AutoAnalysisStatus = () => {
  const { owner, repo } = useParams();
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchRepoAnalysisHistory(owner, repo, token);

      const sortedAnalyses = (data?.analyses || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAnalyses(sortedAnalyses);
      setLoading(false);
    };

    fetchData();
  }, [owner, repo]);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();
  
    const isToday = date.toDateString() === now.toDateString();
  
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
  
    const timeString = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  
    if (isToday) {
      return `Today at ${timeString}`;
    } else if (isYesterday) {
      return `Yesterday at ${timeString}`;
    } else {
      const dateString = date.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return `${dateString}, ${timeString}`;
    }
  };
  

  return (
    <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Auto Analysis History for{" "}
        <span className="text-blue-400">{repo}</span>
      </h2>

      {loading ? (
        <Loader />
      ) : analyses.length === 0 ? (
        <div className="text-gray-400 text-center py-6">
          No analysis data available.
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis, index) => (
            <div
              key={index}
              className="p-4 bg-[#1e293b] rounded-xl border border-[#334155] hover:border-blue-500 transition duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  {analysis.file?.filename ? (
                    <p className="text-sm text-gray-300">
                      <span className="text-blue-400 font-medium">File:</span>{" "}
                      <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
                        {analysis.file.filename}
                      </code>
                      <div className="flex items-center gap-4 text-sm text-gray-700">
  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
    {analysis.errorCount} {analysis.errorCount === 1 ? "Error" : "Errors"}
  </span>
  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
    {analysis.suggestionCount} {analysis.suggestionCount === 1 ? "Suggestion" : "Suggestions"}
  </span>
  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
    {analysis.optimizationCount} {analysis.optimizationCount === 1 ? "Optimization" : "Optimizations"}
  </span>
</div>

                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No file path available for this analysis.
                    </p>
                  )}

                  <p className="text-sm text-gray-400">
                    <span className="text-blue-400 font-medium">Created:</span>{" "}
                    {formatDateTime(analysis.createdAt)}
                  </p>
                </div>

                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm mt-2 transition"
                  onClick={() => navigate(`/analysis/${analysis.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoAnalysisStatus;

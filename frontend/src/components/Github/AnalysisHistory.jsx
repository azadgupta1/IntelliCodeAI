import React, { useEffect, useState } from "react";
import { fetchAnalysisHistory, fetchAnalysisById } from "../../services/githubServices";

const AnalysisHistory = ({ token }) => {
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      loadHistory();
    }
  }, [token]);

  const loadHistory = async () => {
    setLoading(true);
    const result = await fetchAnalysisHistory(token);
    if (result.success) {
      setAnalysisHistory(result.data);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleAnalysisClick = async (id) => {
    setLoading(true);
    const result = await fetchAnalysisById(id, token);
    if (result.success) {
      setSelectedAnalysis(result.data);
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Analysis History</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <ul className="space-y-2">
        {analysisHistory.map((analysis) => (
          <li
            key={analysis.id}
            onClick={() => handleAnalysisClick(analysis.id)}
            className="p-3 bg-white shadow-md rounded cursor-pointer hover:bg-gray-200"
          >
            <p className="font-semibold">{analysis.file.filename}</p>
            <p className="text-sm text-gray-500">Analyzed on {new Date(analysis.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      {selectedAnalysis && (
        <div className="mt-6 p-4 bg-white shadow-md rounded">
          <h3 className="text-lg font-semibold">Analysis Details</h3>
          <p><strong>File:</strong> {selectedAnalysis.file.filename}</p>
          <p><strong>Commit Hash:</strong> {selectedAnalysis.commitHash}</p>
          <p><strong>Result:</strong> {JSON.stringify(selectedAnalysis.result, null, 2)}</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisHistory;

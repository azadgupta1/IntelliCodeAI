import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAnalysisById } from "../services/githubServices";

const AnalysisDetails = () => {
  const { id } = useParams(); // Extract analysis ID from the URL
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      const result = await fetchAnalysisById(id, token);
      if (result.success) {
        setAnalysis(result.data);
      } else {
        setError(result.message);
      }
      setLoading(false);
    };

    fetchDetails();
  }, [id]);

  if (loading) return <p className="text-center">Loading analysis details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!analysis) return <p className="text-center">No analysis details found.</p>;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">Analysis Details</h2>

      <p><strong>Commit Hash:</strong> {analysis.commitHash}</p>
      <p><strong>File:</strong> {analysis.file ? analysis.file.filename : "No file associated"}</p>

      <h3 className="mt-4 font-semibold">Analysis Results:</h3>
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
        {JSON.stringify(analysis.result, null, 2)}
      </pre>
    </div>
  );
};

export default AnalysisDetails;

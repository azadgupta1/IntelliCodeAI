import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchAnalysisById,
  fetchGithubRepoById,
  fetchAIFixedCode,
} from "../services/githubServices";
import AnalysisSummary from "../components/AnalysisSummary";
import ErrorSection from "../components/ErrorSection";
import SuggestionSection from "../components/SuggestionSection";
import OptimizationSection from "../components/OptimizationSection";
import CodeComparison from "../components/CodeComparison";

const tabs = [
  { id: "errors", label: "Errors" },
  { id: "suggestions", label: "Suggestions" },
  { id: "optimizations", label: "Optimizations" },
  { id: "comparison", label: "Code Comparison" },
];

const AnalysisDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [repo, setRepo] = useState(null);
  const [fixedCode, setFixedCode] = useState("");
  const [originalCode, setOriginalCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [manuallyAnalyzed, setManuallyAnalyzed] = useState(false);
  const [activeTab, setActiveTab] = useState("errors");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("⚠️ You must be logged in to view this page.");
          return;
        }

        setLoading(true);
        const result = await fetchAnalysisById(id, token);
        if (!result.success) {
          setError(result.message || "Failed to fetch analysis data.");
          return;
        }

        const analysisData = result.data;

        console.log("Analysis Detail: ",analysisData);
        setAnalysis(analysisData);

        const repoInfo = await fetchGithubRepoById(analysisData.githubRepoId, token);
        if (!repoInfo.success) {
          setError(repoInfo.message || "Failed to fetch repo data.");
          return;
        }

        setRepo(repoInfo.data);

        if (analysisData.file) {
          const repoName = repoInfo.data.repoName;
          const repoUrl = repoInfo.data.repoUrl;
          const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
          const commitSha = analysisData.commitHash;
          const filePath = analysisData.file.filename;

          const fixResult = await fetchAIFixedCode(owner, repoName, commitSha, filePath, token);

          if (fixResult.success) {
            setFixedCode(fixResult.fixedCode);
            setOriginalCode(fixResult.originalCode);
          } else {
            setError("⚠️ Failed to fetch AI-fixed code.");
          }
        } else if (!analysisData.fileId && analysisData.filePath) {
          setManuallyAnalyzed(true);
          setFixedCode(analysisData.fixedCode);
          setOriginalCode(analysisData.originalCode);
        }
      } catch (err) {
        console.error(err);
        setError("❌ An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const result = analysis?.result || {};

  if (loading) return <div className="text-center py-10 text-white">Loading analysis details...</div>;
  if (error) return <div className="text-center py-10 text-red-400">{error}</div>;
  if (!analysis) return <div className="text-center py-10 text-white">No analysis found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-black px-4 py-1">

      <div>
          <AnalysisSummary analysis={analysis} manuallyAnalyzed={manuallyAnalyzed} />
        </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="border-b border-gray-700">
          <nav className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        

        <div className="pt-4">
          
          {activeTab === "errors" && (
            <ErrorSection errors={result.errors} originalCode={originalCode} fixedCode={fixedCode} analysis={analysis} />
          )}
          {activeTab === "suggestions" && (
            <SuggestionSection
              suggestions={result.suggestions}
              originalCode={originalCode}
              fixedCode={fixedCode}
              analysis={analysis}
            />
          )}
          {activeTab === "optimizations" && (
            <OptimizationSection
              optimizations={result.optimizations}
              originalCode={originalCode}
              fixedCode={fixedCode}
              analysis={analysis}
            />
          )}
          {activeTab === "comparison" && fixedCode && (
            <CodeComparison
              originalCode={originalCode}
              fixedCode={fixedCode}
              manuallyAnalyzed={manuallyAnalyzed}
              analysis={analysis}
              repo={repo}
              navigate={navigate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisDetails;
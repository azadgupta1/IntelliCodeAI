import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Outlet } from "react-router-dom";
import {
  fetchRepoAnalysisHistory,
  ignoreAnalysis,
} from "../../services/githubServices";
import { Loader } from "../../components/ui/loader";
import AnalysisList from "../../components/RepoComponents/RepoAnalysisPage/AnalysisList";
import AnalysisTabs from "../../components/RepoComponents/RepoAnalysisPage/AnalysisTabs";


const AutoAnalysisStatus = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();

  const [analyzed, setAnalyzed] = useState([]);
  const [manuallyAnalyzed, setManuallyAnalyzed] = useState([]);
  const [ignoredAnalyses, setIgnoredAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("current");
  const [subTab, setSubTab] = useState("analyzed");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await fetchRepoAnalysisHistory(owner, repo, token);
        const all = data?.analyses || [];

        const current = all.filter((a) => !a.ignored);
        const ignored = all.filter((a) => a.ignored);

        const manually = current.filter((a) => !a.file && a.filePath);
        const auto = current.filter((a) => !(!a.file && a.filePath));

        const sortByDate = (arr) =>
          [...arr].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

        setAnalyzed(sortByDate(auto));
        setManuallyAnalyzed(sortByDate(manually));
        setIgnoredAnalyses(sortByDate(ignored));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [owner, repo]);

  const handleIgnore = async (analysisId) => {
    try {
      const token = localStorage.getItem("token");
      await ignoreAnalysis(owner, repo, analysisId, token);

      const allCurrent = [...analyzed, ...manuallyAnalyzed];
      const ignoredItem = allCurrent.find((a) => a.id === analysisId);
      if (!ignoredItem) return;

      setAnalyzed((prev) => prev.filter((a) => a.id !== analysisId));
      setManuallyAnalyzed((prev) => prev.filter((a) => a.id !== analysisId));
      setIgnoredAnalyses((prev) => [ignoredItem, ...prev]);
    } catch (error) {
      console.error("Error ignoring analysis:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-100">
          Repository Issues
        </h2>

        <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-gray-800 bg-gray-900 px-3 py-1 text-sm text-gray-400">
          {owner}
          <span className="text-gray-600">/</span>
          {repo}
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm">
        <AnalysisTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          subTab={subTab}
          setSubTab={setSubTab}
          analyzedCount={analyzed.length + manuallyAnalyzed.length}
          ignoredCount={ignoredAnalyses.length}
        />

        <div className="relative mt-6">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  width: "200%",
                  transform:
                    activeTab === "ignored"
                      ? "translateX(-50%)"
                      : "translateX(0%)",
                }}
              >
                {/* Current */}
                <div className="w-1/2 pr-3">
                  {subTab === "analyzed" ? (
                    <AnalysisList
                      list={analyzed}
                      title="Analyzed Issues"
                      activeTab={activeTab}
                      handleIgnore={handleIgnore}
                      navigate={navigate}
                      owner={owner}
                      repo={repo}
                    />
                  ) : (
                    <AnalysisList
                      list={manuallyAnalyzed}
                      title="Manual Reviews"
                      activeTab={activeTab}
                      handleIgnore={handleIgnore}
                      navigate={navigate}
                      owner={owner}
                      repo={repo}
                    />
                  )}
                </div>

                {/* Ignored */}
                <div className="w-1/2 pl-3">
                  <AnalysisList
                    list={ignoredAnalyses}
                    title="Ignored Issues"
                    activeTab={activeTab}
                    navigate={navigate}
                    owner={owner}
                    repo={repo}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default AutoAnalysisStatus;

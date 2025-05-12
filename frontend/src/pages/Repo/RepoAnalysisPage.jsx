import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepoAnalysisHistory, ignoreAnalysis } from "../../services/githubServices";
import { Loader } from "../../components/ui/loader";
import AnalysisList from "../../components/AnalysisList";
import AnalysisTabs from "../../components/AnalysisTabs";
import { Outlet } from "react-router-dom";

const AutoAnalysisStatus = () => {
  const { owner, repo } = useParams();
  const [analyzed, setAnalyzed] = useState([]);
  const [manuallyAnalyzed, setManuallyAnalyzed] = useState([]);
  const [ignoredAnalyses, setIgnoredAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");
  const [subTab, setSubTab] = useState("analyzed");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchRepoAnalysisHistory(owner, repo, token);
      const all = data?.analyses || [];

      const current = all.filter((a) => !a.ignored);
      const ignored = all.filter((a) => a.ignored);

      const manually = current.filter((a) => !a.file && a.filePath);
      const analyzed = current.filter((a) => !(!a.file && a.filePath));

      const sortByDate = (arr) =>
        arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setAnalyzed(sortByDate(analyzed));
      setManuallyAnalyzed(sortByDate(manually));
      setIgnoredAnalyses(sortByDate(ignored));
      setLoading(false);
    };

    fetchData();
  }, [owner, repo]);

  const handleIgnore = async (analysisId) => {
    const token = localStorage.getItem("token");
    try {
      await ignoreAnalysis(owner, repo, analysisId, token);
      const allCurrent = [...analyzed, ...manuallyAnalyzed];
      const updated = allCurrent.filter((a) => a.id !== analysisId);
      const ignoredItem = allCurrent.find((a) => a.id === analysisId);

      setAnalyzed(updated.filter((a) => !(!a.file && a.filePath)));
      setManuallyAnalyzed(updated.filter((a) => !a.file && a.filePath));
      setIgnoredAnalyses([ignoredItem, ...ignoredAnalyses]);
    } catch (error) {
      console.error("Error ignoring analysis:", error);
    }
  };

  console.log("IGNORED : ",ignoredAnalyses);

return (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[300px]">
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-800">Issues</h2>
      <p className="text-gray-500 mt-1 bg-gray-100 p-1 rounded-lg w-40">{owner}/{repo}</p>
    </div>

    <div className="w-full ">
  <AnalysisTabs
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    subTab={subTab}
    setSubTab={setSubTab}
    analyzedCount={analyzed.length + manuallyAnalyzed.length}
    ignoredCount={ignoredAnalyses.length}
  />

  <div className="relative w-full mt-4 transition-all duration-500 bg-blue-50">
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    ) : (
      <div className="overflow-hidden relative">
        <div
          className={`flex transition-transform duration-500 ease-in-out`}
          style={{
            transform:
              activeTab === "ignored"
                ? "translateX(-100%)"
                : "translateX(0%)",
            width: "200%",
          }}
        >
          {/* Main Analyzed/Manual Tab Content */}
          <div className="w-full px-2">
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

          {/* Ignored Tab Content */}
          <div className="w-full px-2">
            <AnalysisList
              list={ignoredAnalyses}
              title="Ignored Issues"
              activeTab={activeTab}
              handleIgnore={handleIgnore}
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




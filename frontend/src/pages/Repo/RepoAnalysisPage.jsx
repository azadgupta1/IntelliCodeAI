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





























// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchRepoAnalysisHistory, ignoreAnalysis } from "../../services/githubServices";
// import { Loader } from "../../components/ui/loader";
// import { CheckCircle } from "lucide-react";

// const AutoAnalysisStatus = () => {
//   const { owner, repo } = useParams();
//   const [analyzed, setAnalyzed] = useState([]);
//   const [manuallyAnalyzed, setManuallyAnalyzed] = useState([]);
//   const [ignoredAnalyses, setIgnoredAnalyses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("current");
//   const [subTab, setSubTab] = useState("analyzed");
//   const [openMenu, setOpenMenu] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);
//       const all = data?.analyses || [];

//       const current = all.filter((a) => !a.ignored);
//       const ignored = all.filter((a) => a.ignored);

//       const manually = current.filter((a) => !a.file && a.filePath);
//       const analyzed = current.filter((a) => !( !a.file && a.filePath ));

//       const sortByDate = (arr) =>
//         arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//       setAnalyzed(sortByDate(analyzed));
//       setManuallyAnalyzed(sortByDate(manually));
//       setIgnoredAnalyses(sortByDate(ignored));
//       setLoading(false);
//     };

//     fetchData();
//   }, [owner, repo]);

//   const formatDateTime = (isoString) => {
//     const date = new Date(isoString);
//     const now = new Date();

//     const isToday = date.toDateString() === now.toDateString();
//     const yesterday = new Date();
//     yesterday.setDate(now.getDate() - 1);
//     const isYesterday = date.toDateString() === yesterday.toDateString();

//     const timeString = date.toLocaleTimeString(undefined, {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//     if (isToday) return `Today at ${timeString}`;
//     if (isYesterday) return `Yesterday at ${timeString}`;

//     const dateString = date.toLocaleDateString(undefined, {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });

//     return `${dateString}, ${timeString}`;
//   };

//   const handleIgnore = async (analysisId) => {
//     const token = localStorage.getItem("token");
//     try {
//       await ignoreAnalysis(owner, repo, analysisId, token);
//       const allCurrent = [...analyzed, ...manuallyAnalyzed];
//       const updated = allCurrent.filter((a) => a.id !== analysisId);
//       const ignoredItem = allCurrent.find((a) => a.id === analysisId);

//       setAnalyzed(updated.filter((a) => !( !a.file && a.filePath )));
//       setManuallyAnalyzed(updated.filter((a) => !a.file && a.filePath));
//       setIgnoredAnalyses([ignoredItem, ...ignoredAnalyses]);
//     } catch (error) {
//       console.error("Error ignoring analysis:", error);
//     } finally {
//       setOpenMenu(null);
//     }
//   };

//   const renderAnalysisList = (list, title) => (
//     <>
//       <h3 className="text-lg font-semibold text-white mb-2 mt-6">{title}</h3>
//       {list.length === 0 ? (
//         <div className="text-gray-400 text-sm italic mb-4">No {title.toLowerCase()} entries.</div>
//       ) : (
//         <div className="space-y-4">
//           {list.map((analysis) => {
//             const isCommitted = analysis.isCommited;
//             const hasFilePathOnly = !analysis.file && analysis.filePath;

//             const borderColor = isCommitted
//               ? "border-green-500 hover:border-green-400"
//               : hasFilePathOnly
//               ? "border-yellow-400 hover:border-yellow-300"
//               : "border-[#334155] hover:border-blue-500";

//             const bgColor = isCommitted
//               ? "bg-[#132d20]"
//               : hasFilePathOnly
//               ? "bg-[#3f2e00]"
//               : "bg-[#1e293b]";

//             return (
//               <div
//                 key={analysis.id}
//                 className={`p-4 rounded-xl border transition duration-200 ${bgColor} ${borderColor}`}
//               >
//                 <div className="flex justify-between items-start gap-4 flex-wrap">
//                   <div className="space-y-2 flex-1">
//                     {analysis.file?.filename || analysis.filePath ? (
//                       <>
//                         <p className="text-sm text-gray-300">
//                           <span className="text-blue-400 font-medium">File:</span>{" "}
//                           <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
//                             {analysis.file?.filename || analysis.filePath}
//                           </code>
//                         </p>

//                         {isCommitted ? (
//                           <div className="flex items-center gap-2 mt-2 text-green-400 font-medium">
//                             <CheckCircle className="w-5 h-5" />
//                             Already Analyzed & Committed
//                           </div>
//                         ) : hasFilePathOnly ? (
//                           <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 inline-block text-sm font-semibold">
//                             Manually Analyzed
//                           </div>
//                         ) : (
//                           <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
//                             <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
//                               {analysis.errorCount} {analysis.errorCount === 1 ? "Error" : "Errors"}
//                             </span>
//                             <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
//                               {analysis.suggestionCount}{" "}
//                               {analysis.suggestionCount === 1 ? "Suggestion" : "Suggestions"}
//                             </span>
//                             <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
//                               {analysis.optimizationCount}{" "}
//                               {analysis.optimizationCount === 1
//                                 ? "Optimization"
//                                 : "Optimizations"}
//                             </span>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <p className="text-sm text-gray-500 italic">No file path available.</p>
//                     )}

//                     <p className="text-sm text-gray-400">
//                       <span className="text-blue-400 font-medium">Created:</span>{" "}
//                       {formatDateTime(analysis.createdAt)}
//                     </p>
//                   </div>

//                   <div className="flex flex-col items-end gap-2">
//                     {!isCommitted && activeTab === "current" && (
//                       <div className="relative">
//                         <button
//                           onClick={() => setOpenMenu(openMenu === analysis.id ? null : analysis.id)}
//                           className="text-gray-400 hover:text-white"
//                         >
//                           <span className="text-lg">•••</span>
//                         </button>
//                         {openMenu === analysis.id && (
//                           <div className="absolute right-0 mt-2 bg-[#1e293b] border border-[#334155] p-2 rounded-md shadow-lg z-10">
//                             <button
//                               onClick={() => handleIgnore(analysis.id)}
//                               className="text-red-500 hover:text-red-700"
//                             >
//                               Ignore
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     <button
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
//                       onClick={() => navigate(`/analysis/${analysis.id}`)}
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
//       <h2 className="text-2xl font-semibold mb-6 text-white">
//         Auto Analysis History for <span className="text-blue-400">{repo}</span>
//       </h2>

//       {/* Main Tabs */}
//       <div className="flex mb-4 space-x-4">
//         <button
//           className={`relative px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "current"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("current")}
//         >
//           Current
//           {(analyzed.length + manuallyAnalyzed.length) > 0 && (
//             <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//               {analyzed.length + manuallyAnalyzed.length}
//             </span>
//           )}
//         </button>
//         <button
//           className={`relative px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "ignored"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("ignored")}
//         >
//           Ignored
//           {ignoredAnalyses.length > 0 && (
//             <span className="absolute -top-1 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5 py-0.5">
//               {ignoredAnalyses.length}
//             </span>
//           )}
//         </button>
//       </div>

//       {loading ? (
//         <Loader />
//       ) : activeTab === "ignored" ? (
//         renderAnalysisList(ignoredAnalyses, "Ignored Analyses")
//       ) : (
//         <>
//           {/* Sub Tabs under "Current" */}
//           <div className="flex mb-4 space-x-4">
//             <button
//               className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//                 subTab === "analyzed"
//                   ? "bg-blue-500 text-white"
//                   : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//               }`}
//               onClick={() => setSubTab("analyzed")}
//             >
//               Analyzed
//             </button>
//             <button
//               className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//                 subTab === "manual"
//                   ? "bg-blue-500 text-white"
//                   : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//               }`}
//               onClick={() => setSubTab("manual")}
//             >
//               Manually Analyzed
//             </button>
//           </div>

//           {subTab === "analyzed"
//             ? renderAnalysisList(analyzed, "Analyzed")
//             : renderAnalysisList(manuallyAnalyzed, "Manually Analyzed")}
//         </>
//       )}
//     </div>
//   );
// };

// export default AutoAnalysisStatus;
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchRepoAnalysisHistory, ignoreAnalysis } from "../services/githubServices";
// import { Loader } from "../components/ui/loader";

// const AutoAnalysisStatus = () => {
//   const { owner, repo } = useParams();
//   const [currentAnalyses, setCurrentAnalyses] = useState([]);
//   const [ignoredAnalyses, setIgnoredAnalyses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("current");
//   const [openMenu, setOpenMenu] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);
      
//       console.log("YOUR data IS",data);
//       const all = data?.analyses || [];

//       const current = all.filter((a) => !a.ignored);
//       const ignored = all.filter((a) => a.ignored);

//       const sortByDate = (arr) =>
//         arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//       setCurrentAnalyses(sortByDate(current));
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
//       const updatedCurrent = currentAnalyses.filter((a) => a.id !== analysisId);
//       const ignoredAnalysis = currentAnalyses.find((a) => a.id === analysisId);
//       setCurrentAnalyses(updatedCurrent);
//       setIgnoredAnalyses([ignoredAnalysis, ...ignoredAnalyses]);
//     } catch (error) {
//       console.error("Error ignoring analysis:", error);
//     } finally {
//       setOpenMenu(null);
//     }
//   };

//   const displayedAnalyses = activeTab === "current" ? currentAnalyses : ignoredAnalyses;

//   return (
//     <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
//       <h2 className="text-2xl font-semibold mb-6 text-white">
//         Auto Analysis History for <span className="text-blue-400">{repo}</span>
//       </h2>

//       {/* Tabs */}
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
//           {currentAnalyses.length > 0 && (
//             <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//               {currentAnalyses.length}
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
//       ) : displayedAnalyses.length === 0 ? (
//         <div className="text-gray-400 text-center py-6">No analysis data available.</div>
//       ) : (
//         <div className="space-y-4">
//           {displayedAnalyses.map((analysis) => (
//             <div
//               key={analysis.id}
//               className="p-4 bg-[#1e293b] rounded-xl border border-[#334155] hover:border-blue-500 transition duration-200"
//             >
//               <div className="flex justify-between items-start gap-4 flex-wrap">
//                 <div className="space-y-2 flex-1">
//                   {analysis.file?.filename ? (
//                     <>
//                       <p className="text-sm text-gray-300">
//                         <span className="text-blue-400 font-medium">File:</span>{" "}
//                         <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
//                           {analysis.file.filename}
//                         </code>
//                       </p>
//                       <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
//                         <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
//                           {analysis.errorCount}{" "}
//                           {analysis.errorCount === 1 ? "Error" : "Errors"}
//                         </span>
//                         <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
//                           {analysis.suggestionCount}{" "}
//                           {analysis.suggestionCount === 1 ? "Suggestion" : "Suggestions"}
//                         </span>
//                         <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
//                           {analysis.optimizationCount}{" "}
//                           {analysis.optimizationCount === 1 ? "Optimization" : "Optimizations"}
//                         </span>
//                       </div>
//                     </>
//                   ) : (
//                     <p className="text-sm text-gray-500 italic">No file path available.</p>
//                   )}

//                   <p className="text-sm text-gray-400">
//                     <span className="text-blue-400 font-medium">Created:</span>{" "}
//                     {formatDateTime(analysis.createdAt)}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                   {activeTab === "current" && (
//                     <div className="relative">
//                       <button
//                         onClick={() => setOpenMenu(openMenu === analysis.id ? null : analysis.id)}
//                         className="text-gray-400 hover:text-white"
//                       >
//                         <span className="text-lg">•••</span>
//                       </button>
//                       {openMenu === analysis.id && (
//                         <div className="absolute right-0 mt-2 bg-[#1e293b] border border-[#334155] p-2 rounded-md shadow-lg z-10">
//                           <button
//                             onClick={() => handleIgnore(analysis.id)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             Ignore
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   )}

//                   <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
//                     onClick={() => navigate(`/analysis/${analysis.id}`)}
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutoAnalysisStatus;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRepoAnalysisHistory, ignoreAnalysis } from "../services/githubServices";
import { Loader } from "../components/ui/loader";
import { CheckCircle } from "lucide-react";

const AutoAnalysisStatus = () => {
  const { owner, repo } = useParams();
  const [currentAnalyses, setCurrentAnalyses] = useState([]);
  const [ignoredAnalyses, setIgnoredAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("current");
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchRepoAnalysisHistory(owner, repo, token);

      const all = data?.analyses || [];

      const current = all.filter((a) => !a.ignored);
      const ignored = all.filter((a) => a.ignored);

      const sortByDate = (arr) =>
        arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setCurrentAnalyses(sortByDate(current));
      setIgnoredAnalyses(sortByDate(ignored));
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

    if (isToday) return `Today at ${timeString}`;
    if (isYesterday) return `Yesterday at ${timeString}`;

    const dateString = date.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return `${dateString}, ${timeString}`;
  };

  const handleIgnore = async (analysisId) => {
    const token = localStorage.getItem("token");
    try {
      await ignoreAnalysis(owner, repo, analysisId, token);
      const updatedCurrent = currentAnalyses.filter((a) => a.id !== analysisId);
      const ignoredAnalysis = currentAnalyses.find((a) => a.id === analysisId);
      setCurrentAnalyses(updatedCurrent);
      setIgnoredAnalyses([ignoredAnalysis, ...ignoredAnalyses]);
    } catch (error) {
      console.error("Error ignoring analysis:", error);
    } finally {
      setOpenMenu(null);
    }
  };

  const displayedAnalyses = activeTab === "current" ? currentAnalyses : ignoredAnalyses;

  return (
    <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
      <h2 className="text-2xl font-semibold mb-6 text-white">
        Auto Analysis History for <span className="text-blue-400">{repo}</span>
      </h2>

      {/* Tabs */}
      <div className="flex mb-4 space-x-4">
        <button
          className={`relative px-4 py-2 rounded-md font-medium transition ${
            activeTab === "current"
              ? "bg-blue-600 text-white"
              : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Current
          {currentAnalyses.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              {currentAnalyses.length}
            </span>
          )}
        </button>
        <button
          className={`relative px-4 py-2 rounded-md font-medium transition ${
            activeTab === "ignored"
              ? "bg-blue-600 text-white"
              : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
          }`}
          onClick={() => setActiveTab("ignored")}
        >
          Ignored
          {ignoredAnalyses.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5 py-0.5">
              {ignoredAnalyses.length}
            </span>
          )}
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : displayedAnalyses.length === 0 ? (
        <div className="text-gray-400 text-center py-6">No analysis data available.</div>
      ) : (
        <div className="space-y-4">
          {displayedAnalyses.map((analysis) => {
            const isCommitted = analysis.isCommited;

            return (
              <div
                key={analysis.id}
                className={`p-4 rounded-xl border transition duration-200 ${
                  isCommitted
                    ? "bg-[#132d20] border-green-500 hover:border-green-400"
                    : "bg-[#1e293b] border-[#334155] hover:border-blue-500"
                }`}
              >
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div className="space-y-2 flex-1">
                    {analysis.file?.filename ? (
                      <>
                        <p className="text-sm text-gray-300">
                          <span className="text-blue-400 font-medium">File:</span>{" "}
                          <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
                            {analysis.file.filename}
                          </code>
                        </p>

                        {isCommitted ? (
                          <div className="flex items-center gap-2 mt-2 text-green-400 font-medium">
                            <CheckCircle className="w-5 h-5" />
                            Already Analyzed & Committed
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                              {analysis.errorCount}{" "}
                              {analysis.errorCount === 1 ? "Error" : "Errors"}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                              {analysis.suggestionCount}{" "}
                              {analysis.suggestionCount === 1 ? "Suggestion" : "Suggestions"}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                              {analysis.optimizationCount}{" "}
                              {analysis.optimizationCount === 1
                                ? "Optimization"
                                : "Optimizations"}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-gray-500 italic">No file path available.</p>
                    )}

                    <p className="text-sm text-gray-400">
                      <span className="text-blue-400 font-medium">Created:</span>{" "}
                      {formatDateTime(analysis.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {!isCommitted && activeTab === "current" && (
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === analysis.id ? null : analysis.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          <span className="text-lg">•••</span>
                        </button>
                        {openMenu === analysis.id && (
                          <div className="absolute right-0 mt-2 bg-[#1e293b] border border-[#334155] p-2 rounded-md shadow-lg z-10">
                            <button
                              onClick={() => handleIgnore(analysis.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Ignore
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
                      onClick={() => navigate(`/analysis/${analysis.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutoAnalysisStatus;





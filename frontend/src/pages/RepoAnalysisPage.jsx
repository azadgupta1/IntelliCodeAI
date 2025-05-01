// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchRepoAnalysisHistory } from "../services/githubServices";
// import { Loader } from "../components/ui/loader";

// const AutoAnalysisStatus = () => {
//   const { owner, repo } = useParams();
//   const [currentAnalyses, setCurrentAnalyses] = useState([]);
//   const [ignoredAnalyses, setIgnoredAnalyses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("current");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCurrentData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);

//       const filtered = (data?.analyses || []).filter((a) => !a.ignored);
//       const sorted = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setCurrentAnalyses(sorted);
//       setLoading(false);
//     };

//     fetchCurrentData();
//   }, [owner, repo]);

//   useEffect(() => {
//     const fetchIgnoredData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);

//       const ignored = (data?.analyses || []).filter((a) => a.ignored);
//       const sorted = ignored.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setIgnoredAnalyses(sorted);
//     };

//     fetchIgnoredData();
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

//   const displayedAnalyses = activeTab === "current" ? currentAnalyses : ignoredAnalyses;

//   return (
//     <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
//       <h2 className="text-2xl font-semibold mb-6 text-white">
//         Auto Analysis History for <span className="text-blue-400">{repo}</span>
//       </h2>

//       {/* Tab Switcher */}
//       <div className="flex mb-4 space-x-4">
//         <button
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "current"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("current")}
//         >
//           Current
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "ignored"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("ignored")}
//         >
//           Ignored
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
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   {analysis.file?.filename ? (
//                     <>
//                       <p className="text-sm text-gray-300">
//                         <span className="text-blue-400 font-medium">File:</span>{" "}
//                         <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
//                           {analysis.file.filename}
//                         </code>
//                       </p>
//                       <div className="flex items-center gap-4 text-sm text-gray-700">
//                         <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
//                           {analysis.errorCount} {analysis.errorCount === 1 ? "Error" : "Errors"}
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

//                 <button
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm mt-2 transition"
//                   onClick={() => navigate(`/analysis/${analysis.id}`)}
//                 >
//                   View Details
//                 </button>
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
          {displayedAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="p-4 bg-[#1e293b] rounded-xl border border-[#334155] hover:border-blue-500 transition duration-200"
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
                          {analysis.optimizationCount === 1 ? "Optimization" : "Optimizations"}
                        </span>
                      </div>
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
                  {activeTab === "current" && (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoAnalysisStatus;



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
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "current"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("current")}
//         >
//           Current
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "ignored"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("ignored")}
//         >
//           Ignored
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





// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchRepoAnalysisHistory, ignoreAnalysis } from "../services/githubServices";  // Import ignoreAnalysis
// import { Loader } from "../components/ui/loader";

// const AutoAnalysisStatus = () => {
//   const { owner, repo } = useParams();
//   const [currentAnalyses, setCurrentAnalyses] = useState([]);
//   const [ignoredAnalyses, setIgnoredAnalyses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("current");
//   const [openMenu, setOpenMenu] = useState(null); // State for open menu
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCurrentData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);

//       const filtered = (data?.analyses || []).filter((a) => !a.ignored);
//       const sorted = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setCurrentAnalyses(sorted);
//       setLoading(false);
//     };

//     fetchCurrentData();
//   }, [owner, repo]);

//   useEffect(() => {
//     const fetchIgnoredData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);

//       const ignored = (data?.analyses || []).filter((a) => a.ignored);
//       const sorted = ignored.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setIgnoredAnalyses(sorted);
//     };

//     fetchIgnoredData();
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
//       await ignoreAnalysis(owner, repo, analysisId, token); // Call the ignore API

//       // Move the analysis to ignored section locally
//       const updatedCurrent = currentAnalyses.filter((analysis) => analysis.id !== analysisId);
//       const ignoredAnalysis = currentAnalyses.find((analysis) => analysis.id === analysisId);
//       setCurrentAnalyses(updatedCurrent);
//       setIgnoredAnalyses([ignoredAnalysis, ...ignoredAnalyses]);
//     } catch (error) {
//       console.error("Error ignoring analysis:", error);
//     }
//   };

//   const displayedAnalyses = activeTab === "current" ? currentAnalyses : ignoredAnalyses;

//   return (
//     <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
//       <h2 className="text-2xl font-semibold mb-6 text-white">
//         Auto Analysis History for <span className="text-blue-400">{repo}</span>
//       </h2>

//       {/* Tab Switcher */}
//       <div className="flex mb-4 space-x-4">
//         <button
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "current"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("current")}
//         >
//           Current
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "ignored"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("ignored")}
//         >
//           Ignored
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
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   {analysis.file?.filename ? (
//                     <>
//                       <p className="text-sm text-gray-300">
//                         <span className="text-blue-400 font-medium">File:</span>{" "}
//                         <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
//                           {analysis.file.filename}
//                         </code>
//                       </p>
//                       <div className="flex items-center gap-4 text-sm text-gray-700">
//                         <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
//                           {analysis.errorCount} {analysis.errorCount === 1 ? "Error" : "Errors"}
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

//                 {/* Three Dots Menu */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setOpenMenu(openMenu === analysis.id ? null : analysis.id)}
//                     className="text-gray-400 hover:text-white"
//                   >
//                     <span className="text-lg">•••</span>
//                   </button>

//                   {openMenu === analysis.id && (
//                     <div className="absolute top-0 right-0 bg-[#1e293b] border border-[#334155] p-2 rounded-md shadow-lg z-10">
//                       <button
//                         onClick={() => handleIgnore(analysis.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         Ignore
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 <button
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm mt-2 transition"
//                   onClick={() => navigate(`/analysis/${analysis.id}`)}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutoAnalysisStatus;





// import React, { useEffect, useState, useRef } from "react";
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
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   // Fetch Current Analyses
//   useEffect(() => {
//     const fetchCurrentData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);
//       const filtered = (data?.analyses || []).filter((a) => !a.ignored);
//       const sorted = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setCurrentAnalyses(sorted);
//       setLoading(false);
//     };
//     fetchCurrentData();
//   }, [owner, repo]);

//   // Fetch Ignored Analyses
//   useEffect(() => {
//     const fetchIgnoredData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);
//       const ignored = (data?.analyses || []).filter((a) => a.ignored);
//       const sorted = ignored.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//       setIgnoredAnalyses(sorted);
//     };
//     fetchIgnoredData();
//   }, [owner, repo]);

//   // Close menu on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenu(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

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
//       setOpenMenu(null);
//     } catch (error) {
//       console.error("Error ignoring analysis:", error);
//     }
//   };

//   const displayedAnalyses = activeTab === "current" ? currentAnalyses : ignoredAnalyses;

//   return (
//     <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
//       <h2 className="text-2xl font-semibold mb-6 text-white">
//         Auto Analysis History for <span className="text-blue-400">{repo}</span>
//       </h2>

//       {/* Tab Switcher */}
//       <div className="flex mb-4 space-x-4">
//         <button
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "current"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("current")}
//         >
//           Current ({currentAnalyses.length})
//         </button>
//         <button
//           className={`px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "ignored"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("ignored")}
//         >
//           Ignored ({ignoredAnalyses.length})
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
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   {analysis.file?.filename ? (
//                     <>
//                       <p className="text-sm text-gray-300">
//                         <span className="text-blue-400 font-medium">File:</span>{" "}
//                         <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
//                           {analysis.file.filename}
//                         </code>
//                       </p>
//                       <div className="flex items-center gap-4 text-sm text-gray-700">
//                         <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
//                           {analysis.errorCount} {analysis.errorCount === 1 ? "Error" : "Errors"}
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
//                   {/* View Button */}
//                   <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
//                     onClick={() => navigate(`/analysis/${analysis.id}`)}
//                   >
//                     View Details
//                   </button>

//                   {/* Three Dots Menu */}
//                   <div className="relative" ref={menuRef}>
//                     <button
//                       onClick={() =>
//                         setOpenMenu(openMenu === analysis.id ? null : analysis.id)
//                       }
//                       className="text-gray-400 hover:text-white text-xl px-2"
//                     >
//                       •••
//                     </button>

//                     {openMenu === analysis.id && (
//                       <div className="absolute right-0 mt-1 bg-[#1e293b] border border-[#334155] p-2 rounded-md shadow-lg z-10">
//                         <button
//                           onClick={() => handleIgnore(analysis.id)}
//                           className="text-red-500 hover:text-red-700 text-sm"
//                         >
//                           Ignore
//                         </button>
//                       </div>
//                     )}
//                   </div>
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























// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { fetchRepoAnalysisHistory } from "../services/githubServices";
// import { Loader } from "../components/ui/loader";

// const AutoAnalysisStatus = () => {
//   const { owner, repo } = useParams();
//   const [analyses, setAnalyses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

  

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       const data = await fetchRepoAnalysisHistory(owner, repo, token);
  
//       const filteredAnalyses = (data?.analyses || []).filter(
//         (a) => !a.ignored // Exclude ignored analyses
//       );
  
//       const sortedAnalyses = filteredAnalyses.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
  
//       setAnalyses(sortedAnalyses);
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
  
//     if (isToday) {
//       return `Today at ${timeString}`;
//     } else if (isYesterday) {
//       return `Yesterday at ${timeString}`;
//     } else {
//       const dateString = date.toLocaleDateString(undefined, {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       });
//       return `${dateString}, ${timeString}`;
//     }
//   };
  

//   return (
//     <div className="p-6 bg-[#0f172a] rounded-2xl shadow-md border border-[#1e293b] text-white min-h-[300px]">
//       <h2 className="text-2xl font-semibold mb-6 text-white">
//         Auto Analysis History for{" "}
//         <span className="text-blue-400">{repo}</span>
//       </h2>

//       {loading ? (
//         <Loader />
//       ) : analyses.length === 0 ? (
//         <div className="text-gray-400 text-center py-6">
//           No analysis data available.
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {analyses.map((analysis, index) => (
//             <div
//               key={index}
//               className="p-4 bg-[#1e293b] rounded-xl border border-[#334155] hover:border-blue-500 transition duration-200"
//             >
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   {analysis.file?.filename ? (
//                     <p className="text-sm text-gray-300">
//                       <span className="text-blue-400 font-medium">File:</span>{" "}
//                       <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
//                         {analysis.file.filename}
//                       </code>
//                       <div className="flex items-center gap-4 text-sm text-gray-700">
//   <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
//     {analysis.errorCount} {analysis.errorCount === 1 ? "Error" : "Errors"}
//   </span>
//   <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
//     {analysis.suggestionCount} {analysis.suggestionCount === 1 ? "Suggestion" : "Suggestions"}
//   </span>
//   <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
//     {analysis.optimizationCount} {analysis.optimizationCount === 1 ? "Optimization" : "Optimizations"}
//   </span>
// </div>

//                     </p>
//                   ) : (
//                     <p className="text-sm text-gray-500 italic">
//                       No file path available for this analysis.
//                     </p>
//                   )}

//                   <p className="text-sm text-gray-400">
//                     <span className="text-blue-400 font-medium">Created:</span>{" "}
//                     {formatDateTime(analysis.createdAt)}
//                   </p>
//                 </div>

//                 <button
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm mt-2 transition"
//                   onClick={() => navigate(`/analysis/${analysis.id}`)}
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutoAnalysisStatus;














// useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem("token");
  //     const data = await fetchRepoAnalysisHistory(owner, repo, token);

  //     const sortedAnalyses = (data?.analyses || []).sort(
  //       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  //     );

  //     setAnalyses(sortedAnalyses);
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, [owner, repo]);

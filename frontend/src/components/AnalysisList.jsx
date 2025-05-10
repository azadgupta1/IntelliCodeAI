import React, { useState } from "react";
import { CheckCircle } from "lucide-react";
import { useParams } from "react-router";

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

const AnalysisItem = ({ analysis, activeTab, handleIgnore, navigate, owner, repo }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const isCommitted = analysis.isCommited;
  const hasFilePathOnly = !analysis.file && analysis.filePath;

  const statusStyle = isCommitted
    ? "border-green-500 bg-green-50"
    : hasFilePathOnly
    ? "border-yellow-400 bg-yellow-50"
    : "border-gray-700 bg-gray-800";

  return (
    <div
      className={`p-5 rounded-lg border ${statusStyle} transition-all duration-200 shadow-sm hover:shadow-md`}
    >
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex-1 space-y-2">
          {analysis.file?.filename || analysis.filePath ? (
            <>
              <p className="text-sm text-gray-200">
                <span className="text-blue-400 font-semibold">File:</span>{" "}
                <code className="bg-gray-900 px-2 py-1 rounded text-gray-100">
                  {analysis.file?.filename || analysis.filePath}
                </code>
              </p>

              {isCommitted ? (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Already Analyzed & Committed
                </div>
              ) : hasFilePathOnly ? (
                <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs font-semibold">
                  Manually Analyzed
                </span>
              ) : (
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
                    {analysis.errorCount} {analysis.errorCount === 1 ? "Error" : "Errors"}
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
              )}
            </>
          ) : (
            <p className="text-sm italic text-gray-500">No file path available.</p>
          )}

          <p className="text-xs text-gray-400">
            <span className="text-blue-400 font-medium">Created:</span>{" "}
            {formatDateTime(analysis.createdAt)}
          </p>
        </div>

        <div className="flex flex-col items-end justify-between gap-2">
          {!isCommitted && activeTab === "current" && (
            <div className="relative">
              <button
                onClick={() => setOpenMenu((prev) => !prev)}
                className="text-gray-400 hover:text-white text-xl"
              >
                &#x2022;&#x2022;&#x2022;
              </button>
              {openMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-md shadow-lg z-20">
                  <button
                    onClick={() => handleIgnore(analysis.id)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-100 hover:text-red-600"
                  >
                    Ignore
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
            onClick={() => navigate(`/repositories/${owner}/${repo}/analysis/${analysis.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const AnalysisList = ({ list, title, activeTab, handleIgnore, navigate, owner, repo }) => {

  return (
    <div className="mt-6">
      {list.length === 0 ? (
        <p className="text-sm italic text-gray-400">No {title.toLowerCase()} entries.</p>
      ) : (
        <div className="space-y-4">
          {list.map((analysis) => (
            <AnalysisItem
              key={analysis.id}
              analysis={analysis}
              activeTab={activeTab}
              handleIgnore={handleIgnore}
              navigate={navigate}
              owner={owner}
              repo={repo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisList;



















// import React, { useState } from "react";
// import { CheckCircle } from "lucide-react";

// const formatDateTime = (isoString) => {
//   const date = new Date(isoString);
//   const now = new Date();

//   const isToday = date.toDateString() === now.toDateString();
//   const yesterday = new Date();
//   yesterday.setDate(now.getDate() - 1);
//   const isYesterday = date.toDateString() === yesterday.toDateString();

//   const timeString = date.toLocaleTimeString(undefined, {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   });

//   if (isToday) return `Today at ${timeString}`;
//   if (isYesterday) return `Yesterday at ${timeString}`;

//   const dateString = date.toLocaleDateString(undefined, {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   return `${dateString}, ${timeString}`;
// };

// const AnalysisItem = ({ analysis, activeTab, handleIgnore, navigate }) => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const isCommitted = analysis.isCommited;
//   const hasFilePathOnly = !analysis.file && analysis.filePath;

//   const borderColor = isCommitted
//     ? "border-green-500 hover:border-green-400"
//     : hasFilePathOnly
//     ? "border-yellow-400 hover:border-yellow-300"
//     : "border-[#334155] hover:border-blue-500";

//   const bgColor = isCommitted
//     ? "bg-[#132d20]"
//     : hasFilePathOnly
//     ? "bg-[#3f2e00]"
//     : "bg-[#1e293b]";

//   return (
//     <div
//       className={`p-4 rounded-xl border transition duration-200 ${bgColor} ${borderColor}`}
//     >
//       <div className="flex justify-between items-start gap-4 flex-wrap">
//         <div className="space-y-2 flex-1">
//           {analysis.file?.filename || analysis.filePath ? (
//             <>
//               <p className="text-sm text-gray-300">
//                 <span className="text-blue-400 font-medium">File:</span>{" "}
//                 <code className="bg-[#0f172a] px-2 py-1 rounded-md text-sm text-gray-200">
//                   {analysis.file?.filename || analysis.filePath}
//                 </code>
//               </p>

//               {isCommitted ? (
//                 <div className="flex items-center gap-2 mt-2 text-green-400 font-medium">
//                   <CheckCircle className="w-5 h-5" />
//                   Already Analyzed & Committed
//                 </div>
//               ) : hasFilePathOnly ? (
//                 <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 inline-block text-sm font-semibold">
//                   Manually Analyzed
//                 </div>
//               ) : (
//                 <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
//                   <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 font-medium">
//                     {analysis.errorCount} {analysis.errorCount === 1 ? "Error" : "Errors"}
//                   </span>
//                   <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
//                     {analysis.suggestionCount}{" "}
//                     {analysis.suggestionCount === 1 ? "Suggestion" : "Suggestions"}
//                   </span>
//                   <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
//                     {analysis.optimizationCount}{" "}
//                     {analysis.optimizationCount === 1 ? "Optimization" : "Optimizations"}
//                   </span>
//                 </div>
//               )}
//             </>
//           ) : (
//             <p className="text-sm text-gray-500 italic">No file path available.</p>
//           )}

//           <p className="text-sm text-gray-400">
//             <span className="text-blue-400 font-medium">Created:</span>{" "}
//             {formatDateTime(analysis.createdAt)}
//           </p>
//         </div>

//         <div className="flex flex-col items-end gap-2">
//           {!isCommitted && activeTab === "current" && (
//             <div className="relative">
//               <button
//                 onClick={() => setOpenMenu(!openMenu)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <span className="text-lg">•••</span>
//               </button>
//               {openMenu && (
//                 <div className="absolute right-0 mt-2 bg-[#1e293b] border border-[#334155] p-2 rounded-md shadow-lg z-10">
//                   <button
//                     onClick={() => handleIgnore(analysis.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     Ignore
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           <button
//             className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
//             onClick={() => navigate(`/analysis/${analysis.id}`)}
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnalysisList = ({ list, title, activeTab, handleIgnore, navigate }) => {
//   return (
//     <>
//       <h3 className="text-lg font-semibold text-white mb-2 mt-6">{title}</h3>
//       {list.length === 0 ? (
//         <div className="text-gray-400 text-sm italic mb-4">No {title.toLowerCase()} entries.</div>
//       ) : (
//         <div className="space-y-4">
//           {list.map((analysis) => (
//             <AnalysisItem
//               key={analysis.id}
//               analysis={analysis}
//               activeTab={activeTab}
//               handleIgnore={handleIgnore}
//               navigate={navigate}
//             />
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

// export default AnalysisList;
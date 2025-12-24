// import React, { useState } from "react";
// import { CheckCircle } from "lucide-react";
// import { useParams } from "react-router";

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

// const AnalysisItem = ({ analysis, activeTab, handleIgnore, navigate, owner, repo }) => {
//   const [openMenu, setOpenMenu] = useState(false);
//   const isCommitted = analysis.isCommited;
//   const hasFilePathOnly = !analysis.file && analysis.filePath;

//   const statusStyle = isCommitted
//     ? "border-green-500 bg-green-50"
//     : hasFilePathOnly
//     ? "border-yellow-400 bg-yellow-50"
//     : "border-gray-700 bg-gray-800";

//   return (
//     <div
//       className={`p-5 rounded-lg border ${statusStyle} transition-all duration-200 shadow-sm hover:shadow-md`}
//     >
//       <div className="flex justify-between flex-wrap gap-4">
//         <div className="flex-1 space-y-2">
//           {analysis.file?.filename || analysis.filePath ? (
//             <>
//               <p className="text-sm text-gray-200">
//                 <span className="text-blue-400 font-semibold">File:</span>{" "}
//                 <code className="bg-gray-900 px-2 py-1 rounded text-gray-100">
//                   {analysis.file?.filename || analysis.filePath}
//                 </code>
//               </p>

//               {isCommitted ? (
//                 <div className="flex items-center gap-2 text-green-600 font-medium">
//                   <CheckCircle className="w-5 h-5" />
//                   Already Analyzed & Committed
//                 </div>
//               ) : hasFilePathOnly ? (
//                 <span className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-800 text-xs font-semibold">
//                   Manually Analyzed
//                 </span>
//               ) : (
//                 <div className="flex flex-wrap gap-2 text-sm">
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
//             <p className="text-sm italic text-gray-500">No file path available.</p>
//           )}

//           <p className="text-xs text-gray-400">
//             <span className="text-blue-400 font-medium">Created:</span>{" "}
//             {formatDateTime(analysis.createdAt)}
//           </p>
//         </div>

//         <div className="flex flex-col items-end justify-between gap-2">
//           {!isCommitted && activeTab === "current" && (
//             <div className="relative">
//               <button
//                 onClick={() => setOpenMenu((prev) => !prev)}
//                 className="text-gray-400 hover:text-white text-xl"
//               >
//                 &#x2022;&#x2022;&#x2022;
//               </button>
//               {openMenu && (
//                 <div className="absolute right-0 mt-2 w-32 bg-white text-gray-800 rounded-md shadow-lg z-20">
//                   <button
//                     onClick={() => handleIgnore(analysis.id)}
//                     className="block w-full text-left px-4 py-2 text-sm hover:bg-red-100 hover:text-red-600"
//                   >
//                     Ignore
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           <button
//             className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition"
//             onClick={() => navigate(`/repositories/${owner}/${repo}/analysis/${analysis.id}`)}
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AnalysisList = ({ list, title, activeTab, handleIgnore, navigate, owner, repo }) => {

//   return (
//     <div className="mt-6">
//       {list.length === 0 ? (
//         <p className="text-sm italic text-gray-400">No {title.toLowerCase()} entries.</p>
//       ) : (
//         <div className="space-y-4">
//           {list.map((analysis) => (
//             <AnalysisItem
//               key={analysis.id}
//               analysis={analysis}
//               activeTab={activeTab}
//               handleIgnore={handleIgnore}
//               navigate={navigate}
//               owner={owner}
//               repo={repo}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalysisList;















































import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

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

  if (isToday) return `Today · ${timeString}`;
  if (isYesterday) return `Yesterday · ${timeString}`;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const AnalysisItem = ({
  analysis,
  activeTab,
  handleIgnore,
  navigate,
  owner,
  repo,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const isCommitted = analysis.isCommited;
  const isManual = !analysis.file && analysis.filePath;

  const statusColor = isCommitted
    ? "bg-green-500"
    : isManual
    ? "bg-yellow-400"
    : "bg-blue-500";

  return (
    <div className="relative rounded-lg border border-gray-800 bg-gray-900 p-4 transition hover:border-gray-700">
      {/* Status Indicator */}
      <span
        className={`absolute left-0 top-0 h-full w-1 rounded-l-lg ${statusColor}`}
      />

      <div className="flex justify-between gap-6">
        {/* Left */}
        <div className="flex-1 space-y-2">
          {analysis.file?.filename || analysis.filePath ? (
            <>
              <p className="text-sm text-gray-300">
                <span className="text-gray-500">File</span>{" "}
                <code className="rounded bg-gray-800 px-2 py-0.5 text-gray-200">
                  {analysis.file?.filename || analysis.filePath}
                </code>
              </p>

              {isCommitted ? (
                <div className="flex items-center gap-2 text-sm text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  Committed analysis
                </div>
              ) : isManual ? (
                <span className="inline-block rounded-full bg-gray-800 px-3 py-1 text-xs text-yellow-400">
                  Manual review
                </span>
              ) : (
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded bg-gray-800 px-2 py-1 text-red-400">
                    {analysis.errorCount} Errors
                  </span>
                  <span className="rounded bg-gray-800 px-2 py-1 text-yellow-400">
                    {analysis.suggestionCount} Suggestions
                  </span>
                  <span className="rounded bg-gray-800 px-2 py-1 text-blue-400">
                    {analysis.optimizationCount} Optimizations
                  </span>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm italic text-gray-500">
              No file information available
            </p>
          )}

          <p className="text-xs text-gray-500">
            Created {formatDateTime(analysis.createdAt)}
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end justify-between">
          {!isCommitted && activeTab === "current" && (
            <div className="relative">
              <button
                onClick={() => setOpenMenu((p) => !p)}
                className="text-gray-400 hover:text-gray-200"
              >
                •••
              </button>

              {openMenu && (
                <div className="absolute right-0 z-20 mt-2 w-32 rounded-md border border-gray-800 bg-gray-900 shadow-lg">
                  <button
                    onClick={() => handleIgnore(analysis.id)}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-red-400"
                  >
                    Ignore
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            onClick={() =>
              navigate(
                `/repositories/${owner}/${repo}/analysis/${analysis.id}`
              )
            }
            className="mt-2 rounded-md border border-gray-700 px-4 py-1.5 text-sm text-gray-200 transition hover:border-gray-500 hover:bg-gray-800"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

const AnalysisList = ({
  list,
  title,
  activeTab,
  handleIgnore,
  navigate,
  owner,
  repo,
}) => {
  return (
    <div className="mt-6 space-y-4">
      {list.length === 0 ? (
        <p className="text-sm text-gray-500">
          No {title.toLowerCase()} available.
        </p>
      ) : (
        list.map((analysis) => (
          <AnalysisItem
            key={analysis.id}
            analysis={analysis}
            activeTab={activeTab}
            handleIgnore={handleIgnore}
            navigate={navigate}
            owner={owner}
            repo={repo}
          />
        ))
      )}
    </div>
  );
};

export default AnalysisList;

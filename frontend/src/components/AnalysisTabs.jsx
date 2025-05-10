// import React from "react";

// const AnalysisTabs = ({ activeTab, setActiveTab, subTab, setSubTab, analyzedCount, ignoredCount }) => {
//   return (
//     <>
//       {/* Main Tabs */}
//       <div className="flex mb-4 space-x-4 bg-blue-50">
//         <button
//           className={`relative px-4 py-2 rounded-md font-medium transition ${
//             activeTab === "current"
//               ? "bg-blue-600 text-white"
//               : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//           }`}
//           onClick={() => setActiveTab("current")}
//         >
//           Current
//           {analyzedCount > 0 && (
//             <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//               {analyzedCount}
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
//           {ignoredCount > 0 && (
//             <span className="absolute -top-1 -right-2 bg-orange-400 text-white text-xs rounded-full px-1.5 py-0.5">
//               {ignoredCount}
//             </span>
//           )}
//         </button>
//       </div>

//       {/* Sub Tabs under "Current" */}
//       {activeTab === "current" && (
//         <div className="flex mb-4 space-x-4 bg-blue-50">
//           <button
//             className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//               subTab === "analyzed"
//                 ? "bg-blue-500 text-white"
//                 : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//             }`}
//             onClick={() => setSubTab("analyzed")}
//           >
//             Analyzed
//           </button>
//           <button
//             className={`px-3 py-1 rounded-md text-sm font-medium transition ${
//               subTab === "manual"
//                 ? "bg-blue-500 text-white"
//                 : "bg-[#1e293b] text-gray-300 hover:bg-[#334155]"
//             }`}
//             onClick={() => setSubTab("manual")}
//           >
//             Manually Analyzed
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default AnalysisTabs;
import React from "react";

const AnalysisTabs = ({
  activeTab,
  setActiveTab,
  subTab,
  setSubTab,
  analyzedCount,
  ignoredCount,
}) => {
  const tabList = [
    { id: "current", label: "Current", count: analyzedCount },
    { id: "ignored", label: "Ignored", count: ignoredCount },
  ];

  const subTabList = [
    { id: "analyzed", label: "Analyzed" },
    { id: "manual", label: "Manual Reviews" },
  ];

  return (
    <div className="w-full">
      {/* Main Tabs */}
      <div className="relative flex border-b border-gray-200 mb-4">
        {tabList.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-2 px-4 text-sm font-medium focus:outline-none transition-all duration-300 ${
              activeTab === tab.id
                ? "text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 rounded transition-all duration-300" />
            )}
          </button>
        ))}
      </div>

      {/* Sub Tabs (only if current is active) */}
      {activeTab === "current" && (
        <div className="relative flex border-b border-gray-100 mb-4">
          {subTabList.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`relative py-1.5 px-3 text-sm font-medium focus:outline-none transition-all duration-300 ${
                subTab === tab.id
                  ? "text-blue-500"
                  : "text-gray-400 hover:text-blue-500"
              }`}
            >
              {tab.label}
              {subTab === tab.id && (
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 rounded transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnalysisTabs;

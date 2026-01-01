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
      <div className="flex items-center gap-6 border-b border-gray-800 pb-2">
        {tabList.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 pb-2 text-sm font-medium transition ${
                isActive
                  ? "text-gray-100"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab.label}

              {tab.count > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    isActive
                      ? "bg-gray-700 text-gray-100"
                      : "bg-gray-800 text-gray-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}

              {isActive && (
                <span className="absolute -bottom-[9px] left-0 h-0.5 w-full rounded bg-blue-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Sub Tabs */}
      {activeTab === "current" && (
        <div className="mt-4 flex items-center gap-4 border-b border-gray-800 pb-2">
          {subTabList.map((tab) => {
            const isActive = subTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`relative pb-1 text-sm font-medium transition ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute -bottom-[7px] left-0 h-0.5 w-full rounded bg-blue-400" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AnalysisTabs;

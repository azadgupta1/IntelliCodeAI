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

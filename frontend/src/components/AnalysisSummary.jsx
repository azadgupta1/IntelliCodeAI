import React from "react";
import { useParams } from "react-router";
import { format, isToday, isYesterday } from "date-fns";

const AnalysisSummary = ({ analysis, manuallyAnalyzed }) => {
  const { owner } = useParams();

  const createdAt = new Date(analysis.createdAt);
  const shortCommitHash = analysis.commitHash?.slice(0, 7) || "unknown";

  const formatTime = (date) => {
    const timeString = format(date, "h:mm a");
    if (isToday(date)) {
      return `Today at ${timeString}`;
    } else if (isYesterday(date)) {
      return `Yesterday at ${timeString}`;
    } else {
      return format(date, "MMM d 'at' h:mm a");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-black">{analysis.commitMessage}</h1>

      {/* File Info */}
      <p className="mb-2">
        <span className="font-medium text-black"></span>{" "}
        <span className="bg-gray-200/50 text-black/70 p-1 rounded">
          {analysis.file?.filename || analysis.filePath || "N/A"}
        </span>
      </p>

      {/* Commit Meta with Avatar */}
      <div className="flex items-center gap-3 ">
        <img
          src={`https://github.com/${owner}.png`}
          alt={`${owner}'s avatar`}
          className="w-10 h-10 rounded-full"
        />

        <div className="mt-2">
          <span className="text-black text-sm">
            <span className="font-bold">{owner}</span> committed <span className="font-bold">{shortCommitHash}</span>
          </span>


          {/* Commit Time */}
          <p className="text-gray-500 text-sm mb-4">
             {formatTime(createdAt)}
          </p>
        </div>
      </div>

      {/* Optional Manual Flag */}
      {manuallyAnalyzed && (
        <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-500 text-black">
          Manually Analyzed
        </span>
      )}
    </div>
  );
};

export default AnalysisSummary;

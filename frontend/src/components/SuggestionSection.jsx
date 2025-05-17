// import React from "react";
// import DiffViewer from "../components/DiffViewer";

// const getLineContext = (code, line, context = 3) => {
//   const lines = code.split("\n");
//   const start = Math.max(0, line - context - 1);
//   const end = Math.min(lines.length, line + context);
//   return lines.slice(start, end).join("\n");
// };

// const SuggestionSection = ({ suggestions, originalCode, fixedCode }) => {
//   if (!suggestions?.length) return null;

//   console.log("Suggestions are : ",suggestions)

//   return (
//     <div>
//       <h2 className="text-2xl text-yellow-300 font-semibold mb-4">💡 Suggestions</h2>
//       {suggestions.map((sugg, idx) => (
//         <DiffViewer
//           key={idx}
//           oldValue={getLineContext(originalCode, sugg.line || 1)}
//           newValue={getLineContext(fixedCode, sugg.line || 1)}
//           title={`💡 ${sugg.message} (Line ${sugg.line || 1})`}
//         />
//       ))}
//     </div>
//   );
// };

// export default SuggestionSection;


import React from "react";
import DiffViewer from "../components/DiffViewer";
import { IoDocumentOutline, IoBarChart } from "react-icons/io5";

const getLineContext = (code, line, context = 2) => {
  const lines = code.split("\n");
  const start = Math.max(0, line - context - 1);
  const end = Math.min(lines.length, line + context);
  return lines.slice(start, end).join("\n");
};

const SuggestionSection = ({ suggestions, originalCode, fixedCode, analysis }) => {
  if (!suggestions?.length) return null;

  console.log("Suggestion: ",suggestions);
  console.log( originalCode);
  console.log("Suggestion Analysis: ", analysis);
  console.log("FilePath is : ", analysis.filePath);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-yellow-500 font-semibold mb-4">💡 Suggestions</h2>

      {suggestions.map((sugg, idx) => (
        <div
          key={idx}
          className="border border-gray-200 border-t-4 border-t-yellow-400 rounded-md p-4 bg-white shadow-md w-full max-w-3xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-yellow-500 font-semibold">
                <IoBarChart className="w-5 h-5" />
                <span>SUGGESTION</span>
              </div>
              <p className="text-gray-800 font-medium">Line {sugg.line || 1}</p>
            </div>
          </div>

          {/* Message */}
          <p className="mt-2 text-sm text-gray-700 font-medium">{sugg.message}</p>

          {/* File path (mocked or update this if needed) */}
          <div className="mt-3 flex items-center text-sm text-gray-600 space-x-2">
            <IoDocumentOutline className="w-5 h-5 text-gray-500" />
            <span>{analysis.file.filename || analysis.filePath}</span>
            {/* <span className="font-semibold">hello.js</span> */}
          </div>

          {/* Code Diff Viewer */}
          <div className="mt-4">
            <DiffViewer
              oldValue={getLineContext(originalCode, sugg.line || 1)}
              newValue={getLineContext(fixedCode, sugg.line || 1)}
              title={null}
              showHeader={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestionSection;

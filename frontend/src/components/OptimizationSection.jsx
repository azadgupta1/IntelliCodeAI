// import React from "react";
// import DiffViewer from "../components/DiffViewer";

// const getLineContext = (code, line, context = 3) => {
//   const lines = code.split("\n");
//   const start = Math.max(0, line - context - 1);
//   const end = Math.min(lines.length, line + context);
//   return lines.slice(start, end).join("\n");
// };

// const OptimizationSection = ({ optimizations, originalCode, fixedCode }) => {
//   if (!optimizations?.length) return null;

//   return (
//     <div>
//       <h2 className="text-2xl text-green-400 font-semibold mb-4">🚀 Optimizations</h2>
//       {optimizations.map((opt, idx) => (
//         <DiffViewer
//           key={idx}
//           oldValue={getLineContext(originalCode, opt.line || 1)}
//           newValue={getLineContext(fixedCode, opt.line || 1)}
//           title={`🚀 ${opt.message} (Line ${opt.line || 1})`}
//         />
//       ))}
//     </div>
//   );
// };

// export default OptimizationSection;

import React from "react";
import DiffViewer from "../components/DiffViewer";
import { IoRocketOutline, IoDocumentOutline } from "react-icons/io5";

const getLineContext = (code, line, context = 2) => {
  const lines = code.split("\n");
  const start = Math.max(0, line - context - 1);
  const end = Math.min(lines.length, line + context);
  return lines.slice(start, end).join("\n");
};

const OptimizationSection = ({ optimizations, originalCode, fixedCode }) => {
  if (!optimizations?.length) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-green-500 font-semibold mb-4">🚀 Optimizations</h2>

      {optimizations.map((opt, idx) => (
        <div
          key={idx}
          className="border border-gray-200 border-t-4 border-t-green-700 rounded-md p-4 bg-white shadow-md w-full max-w-3xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-500 font-semibold">
                <IoRocketOutline className="w-5 h-5" />
                <span>OPTIMIZATION</span>
              </div>
              <p className="text-gray-800 font-medium">Line {opt.line || 1}</p>
            </div>
          </div>

          {/* Message */}
          <p className="mt-2 text-sm text-gray-700 font-medium">{opt.message}</p>

          {/* File path (customize as needed) */}
          <div className="mt-3 flex items-center text-sm text-gray-600 space-x-2">
            <IoDocumentOutline className="w-5 h-5 text-gray-500" />
            <span>Blogger/backend/controllers/</span>
            <span className="font-semibold">hello.js</span>
          </div>

          {/* Code Diff Viewer */}
          <div className="mt-4">
            <DiffViewer
              oldValue={getLineContext(originalCode, opt.line || 1)}
              newValue={getLineContext(fixedCode, opt.line || 1)}
              title={null}
              showHeader={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OptimizationSection;

import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import { IoDocumentOutline, IoChevronDown, IoBarChart } from "react-icons/io5";

const getSingleLineCode = (code, line) => {
  const lines = code.split("\n");
  return lines[line - 1] || "";
};

const getSeverityDetails = (severity) => {
  switch (severity) {
    case "high":
      return {
        label: "CRITICAL",
        borderColor: "border-t-red-500",
        textColor: "text-red-600",
        bars: [true, true, true],
        barColor: "bg-red-600",
        barBg: "bg-red-200"
      };
    case "medium":
      return {
        label: "MEDIUM",
        borderColor: "border-t-orange-400",
        textColor: "text-orange-500",
        bars: [true, true, false],
        barColor: "bg-orange-500",
        barBg: "bg-orange-200"
      };
    case "low":
      return {
        label: "LOW",
        borderColor: "border-t-yellow-400",
        textColor: "text-yellow-500",
        bars: [true, false, false],
        barColor: "bg-yellow-500",
        barBg: "bg-yellow-200"
      };
    default:
      return {
        label: "UNKNOWN",
        borderColor: "border-t-gray-400",
        textColor: "text-gray-500",
        bars: [false, false, false],
        barColor: "bg-gray-500",
        barBg: "bg-gray-300"
      };
  }
};

const ErrorSection = ({ errors, originalCode, analysis }) => {
  if (!errors?.length) return null;


  return (
    <div className="space-y-6">
      {errors.map((err, idx) => {
        const { label, borderColor, textColor, bars, barColor, barBg } = getSeverityDetails(err.severity);

        return (
          <div
            key={idx}
            className={`border border-gray-200 rounded-md p-4 bg-white shadow-md w-full max-w-3xl border-t-4 ${borderColor}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center space-x-4">
                {/* Vertical Bars Indicator */}
                <div className="flex flex-row justify-center items-center space-x-1 mr-2">
                  {bars.map((filled, i) => (
                    <div
                      key={i}
                      className={`w-1 h-4 rounded-sm ${filled ? barColor : barBg}`}
                    />
                  ))}
                </div>

                <div className={`flex items-center space-x-2 font-semibold ${textColor}`}>
                  <span>{label}</span>
                </div>
                <p className="text-gray-800 font-medium">Error in line {err.line || 1}</p>
              </div>

              <div className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">
                Needs Fix
              </div>

              <button className="text-gray-500 hover:text-gray-700">
                <FaEllipsisH className="w-5 h-5" />
              </button>

              <IoChevronDown className="text-gray-500 w-5 h-5" />
            </div>

            {/* Message */}
            <p className="mt-2 text-sm text-gray-700 font-medium">{err.message}</p>

            {/* File path */}
            <div className="mt-3 flex items-center text-sm text-gray-600 space-x-2">
              <IoDocumentOutline className="w-5 h-5 text-gray-500" />
              <span>{analysis.file.filename}</span>
              {/* <span className="font-semibold">hello.js</span> */}
            </div>

            {/* Code Block */}
            <pre className="mt-3 bg-gray-100 text-sm rounded-md overflow-x-auto">
              <code className="block px-4 py-2 text-gray-800">
                <span className="text-gray-400 select-none">{err.line || 1} </span>
                <span>{getSingleLineCode(originalCode, err.line || 1)}</span>
              </code>
            </pre>
          </div>
        );
      })}
    </div>
  );
};

export default ErrorSection;













// import React from "react";
// import SingleLineCodePreview from "./SingleLine";
// import IssueComponent from "./IssueComponent";

// const getSingleLineCode = (code, line) => {
//   const lines = code.split("\n");
//   return lines[line - 1] || "";
// };

// const ErrorSection = ({ errors, originalCode }) => {
//   if (!errors?.length) return null;

//   console.log(errors);

//   console.log(originalCode);

//   return (
//     <div>
//       <h2 className="text-2xl text-red-400 font-semibold mb-4">🛑 Critical Errors</h2>
//       {errors.map((err, idx) => (
//         <div key={idx} className="mb-4">
//           <h3 className="text-sm font-medium text-red-600 mb-1">
//             ❌ {err.message} (Line {err.line || 1})
//           </h3>
//           <SingleLineCodePreview code={getSingleLineCode(originalCode, err.line || 1)} />
//         </div>
//       ))}

//       <div className="mt-6">
//         <IssueComponent />
//       </div>
//     </div>
//   );
// };

// export default ErrorSection;




// import React from "react";
// import DiffViewer from "../components/DiffViewer";
// import IssueComponent from "./IssueComponent";

// const getLineContext = (code, line) => {
//   const lines = code.split("\n");
//   const selected = lines[line - 1] || "";
//   return `\n${selected}\n`; // Ensure at least 2 lines with the target line in the middle
// };



// const ErrorSection = ({ errors, originalCode, fixedCode }) => {
//   if (!errors?.length) return null;

//   console.log("Errors are: ",errors);
//   console.log( originalCode);
//   console.log( fixedCode);

//   return (
//     <div>
//       <h2 className="text-2xl text-red-400 font-semibold mb-4">🛑 Critical Errors</h2>
//       {errors.map((err, idx) => (
//         <DiffViewer
//           key={idx}
//           oldValue={getLineContext(originalCode, err.line || 1)}
//           newValue={getLineContext(fixedCode, err.line || 1)}
//           title={`❌ ${err.message} (Line ${err.line || 1})`}
//         />
//       ))}

//       <div>
//         <IssueComponent />
//       </div>
//     </div>
//   );
// };

// export default ErrorSection;










// const getLineContext = (code, line, context = 3) => {
//   const lines = code.split("\n");
//   const start = Math.max(0, line - context - 1);
//   const end = Math.min(lines.length, line + context);
//   return lines.slice(start, end).join("\n");
// };
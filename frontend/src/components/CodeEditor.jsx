// import React from "react";
// import Editor from "@monaco-editor/react";

// const CodeEditor = ({ code, language = "javascript", readOnly = false }) => {
//   return (
//     <div className="border rounded shadow">
//       <Editor
//         height="400px"
//         defaultLanguage={language}
//         value={code}
//         options={{
//           readOnly,
//           minimap: { enabled: false },
//           fontSize: 14,
//         }}
//       />
//     </div>
//   );
// };

// export default CodeEditor;



import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, language = "javascript", readOnly = false }) => {
  return (
    <div className="border border-gray-700 rounded-xl shadow-md overflow-hidden">
      <Editor
        height="400px"
        defaultLanguage={language}
        value={code}
        theme="vs-dark" // ← This applies the dark VS Code-like theme
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "Fira Code, Menlo, Monaco, 'Courier New', monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          wordWrap: "on",
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;

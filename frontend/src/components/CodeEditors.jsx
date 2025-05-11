import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, readOnly = true, language = "javascript" }) => {
  return (
    <div className="border border-gray-300 rounded-sm overflow-hidden shadow-sm">
      <Editor
        height="400px"
        defaultLanguage={language}
        defaultValue={code}
        theme="vs-light" // use "vs-dark" if you want dark theme
        options={{
          readOnly,
          fontSize: 14,
          minimap: { enabled: false },
          lineNumbers: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;

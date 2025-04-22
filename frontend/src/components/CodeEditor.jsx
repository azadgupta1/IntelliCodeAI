import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, language = "javascript", readOnly = false }) => {
  return (
    <div className="border rounded shadow">
      <Editor
        height="400px"
        defaultLanguage={language}
        value={code}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default CodeEditor;


// needs to fix this 
import React from "react";
import Editor from "@monaco-editor/react";

const SingleLineCodePreview = ({ code, language = "javascript" }) => {
  return (
    <div className="rounded-md border border-gray-300 overflow-hidden shadow-sm">
      <Editor
        height="40px"
        defaultLanguage={language}
        value={code}
        theme="vs-light" // Light theme
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 13,
          lineNumbers: "off",
          scrollBeyondLastLine: false,
          wordWrap: "off",
          padding: { top: 4, bottom: 4 },
          automaticLayout: true,
          renderLineHighlight: "none",
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden"
          },
        }}
      />
    </div>
  );
};

export default SingleLineCodePreview;

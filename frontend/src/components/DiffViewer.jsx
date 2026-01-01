import React from "react";
import ReactDiffViewer from "react-diff-viewer-continued";

const DiffViewer = ({ oldValue, newValue, title }) => {
  return (
    <div className="bg-[#1e1e2f] border border-[#2d2d44] rounded-xl shadow-xl p-6 mb-8">
      <h4 className="text-xl font-semibold text-gray-100 mb-4">{title}</h4>
      <ReactDiffViewer
        oldValue={oldValue}
        newValue={newValue}
        splitView={true}
        compareMethod="diffWords"
        styles={{
          variables: {
            dark: {
              addedBackground: "#1a3b2d",
              removedBackground: "#3b1a1a",
              wordAddedBackground: "#245c42",
              wordRemovedBackground: "#6d2626",
              addedGutterBackground: "#1a3b2d",
              removedGutterBackground: "#3b1a1a",
              gutterBackground: "#252535",
              gutterColor: "#999",
              codeFoldGutterBackground: "#1e1e2f",
              codeFoldBackground: "#282a3a",
            },
          },
          diffContainer: {
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "14px",
            lineHeight: "1.6",
          },
        }}
      />
    </div>
  );
};

export default DiffViewer;


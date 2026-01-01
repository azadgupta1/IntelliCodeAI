import React, { useState } from "react";
import CodeEditor from "./CodeEditors";
import SparkleButton from "./WatermarkButton";
import SparkImg from "../assets/Sparkle.svg";
import { motion, AnimatePresence } from "framer-motion";
import {
  commitFixedCodeToGitHub,
  markAsCommitted,
} from "../services/githubServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CodeComparison = ({
  originalCode,
  fixedCode,
  manuallyAnalyzed,
  analysis,
  repo,
  navigate,
}) => {
  const [fixLoading, setFixLoading] = useState(false);
  // const [isCommitted, setIsCommitted] = useState(false);
  const [isCommitted, setIsCommitted] = useState(analysis?.isCommited || false);


  const numErrors = analysis?.result?.errors?.length || 0;

  console.log("CC: ", analysis);

  const handleCommitFix = async () => {
    if (!repo || !analysis || !fixedCode || !analysis.file) return;
    const token = localStorage.getItem("token");
    setFixLoading(true);

    try {
      const repoName = repo.repoName;
      const repoUrl = repo.repoUrl;
      const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
      const filePath = analysis.file.filename;
      const commitSha = analysis.commitHash;
      const githubRepoId = analysis.githubRepoId;

      const commitResult = await commitFixedCodeToGitHub(
        owner,
        repoName,
        commitSha,
        filePath,
        fixedCode,
        token,
        numErrors,
        githubRepoId
      );

      if (commitResult.success) {
        await markAsCommitted(analysis.id, token);
        setIsCommitted(true);
        toast.success("AI fix committed successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: "border-l-4 border-green-700",
          onClose: () => navigate(`/repositories/${owner}/${repoName}/issues`)
        });
        // navigate(`/repositories/${owner}/${repoName}/issues`);
      } else {
        toast.error("❌ Failed to commit fix.", {
          position: "top-center",
          className: "border-l-4 border-red-500",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong while committing.", {
        position: "top-center",
        className: "border-l-4 border-red-500",
      });
    } finally {
      setFixLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">

      <div className="grid md:grid-cols-2 gap-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Original Code
          </h3>
          <p className="text-sm text-gray-700 mb-2 px-3 py-1 rounded-md bg-gray-100 border border-gray-300 shadow-sm w-fit">
            File: {analysis.file.filename}
          </p>

          <CodeEditor code={originalCode} readOnly />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            AI Suggested Fix
          </h3>
          <p className="text-sm text-gray-700 mb-2 px-3 py-1 rounded-md bg-gray-100 border border-gray-300 shadow-sm w-fit">
            File: {analysis.file.filename}
          </p>
          <CodeEditor code={fixedCode} readOnly />
        </div>
      </div>

      {!manuallyAnalyzed && (
  <div className="mt-10 flex justify-center">
    <SparkleButton
      onClick={handleCommitFix}
      disabled={fixLoading || isCommitted}
      state={
        fixLoading ? "loading" : isCommitted ? "success" : "default"
      }
    >
      {fixLoading
        ? "Applying Fix…"
        : isCommitted
        ? "Fix Applied"
        : "Apply AI Fix"}
    </SparkleButton>
  </div>
)}


      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default CodeComparison;


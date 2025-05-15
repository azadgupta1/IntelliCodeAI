// import React, { useState } from "react";
// import CodeEditor from "./CodeEditors";
// import SparkB from "./WatermarkButton";
// import SparkImg from "../assets/Sparkle.svg"
// import { motion, AnimatePresence } from 'framer-motion';
// import SparkleButton from "./WatermarkButton";

// import {
//   commitFixedCodeToGitHub,
//   markAsCommitted,
// } from "../services/githubServices";

// const CodeComparison = ({
//   originalCode,
//   fixedCode,
//   manuallyAnalyzed,
//   analysis,
//   repo,
//   navigate,
// }) => {
//   const [fixLoading, setFixLoading] = useState(false);
//   const [isCommitted, setIsCommitted] = useState(false);

//   const numErrors = analysis?.result?.errors?.length || 0;

//   const handleCommitFix = async () => {
//     if (!repo || !analysis || !fixedCode || !analysis.file) return;
//     const token = localStorage.getItem("token");
//     setFixLoading(true);

//     try {
//       const repoName = repo.repoName;
//       const repoUrl = repo.repoUrl;
//       const owner = repoUrl.split("github.com/")[1]?.split("/")[0];
//       const filePath = analysis.file.filename;
//       const commitSha = analysis.commitHash;
//       const githubRepoId = analysis.githubRepoId;

//       const commitResult = await commitFixedCodeToGitHub(
//         owner,
//         repoName,
//         commitSha,
//         filePath,
//         fixedCode,
//         token,
//         numErrors,
//         githubRepoId
//       );

//       if (commitResult.success) {
//         await markAsCommitted(analysis.id, token);
//         setIsCommitted(true);
//         alert("✅ AI fix committed successfully!");
//         navigate(`/repositories/${owner}/${repoName}/issues`);
//       } else {
//         alert("❌ Failed to commit fix.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("❌ Something went wrong while committing.");
//     } finally {
//       setFixLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
      

//       <div className="grid md:grid-cols-2 gap-0">
//         <div>
//           <h3 className="text-lg font-semibold text-red-600 mb-2">
//             🔧 Original Code
//           </h3>
//           <CodeEditor code={originalCode} readOnly />
//         </div>
//         <div>
//           <h3 className="text-lg font-semibold text-green-600 mb-2">
//             🤖 AI Suggested Fix
//           </h3>
//           <CodeEditor code={fixedCode} readOnly />
//         </div>
//       </div>

//       {!manuallyAnalyzed && (
      
//       <div className="text-center mt-10">
//   <SparkleButton
//     onClick={handleCommitFix}
//     disabled={fixLoading || isCommitted}
//     className={`
//       inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
//       ${fixLoading || isCommitted
//         ? "bg-gray-200 text-gray-600 cursor-not-allowed"
//         : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"}
//       transition-all duration-300 border-none font-semibold text-sm shadow-sm
//     `}
//   >
//     {fixLoading ? (
//       <>
//         <svg
//           className="w-4 h-4 animate-spin"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8v8H4z"
//           ></path>
//         </svg>
//         <span>Committing...</span>
//       </>
//     ) : isCommitted ? (
//       <span>✅ Fix Committed</span>
//     ) : (
//       <>
//         <img
//           src={SparkImg}
//           alt="GitHub"
//           className="w-4 h-4"
//         />
//         <span>Commit AI Fix to GitHub</span>
//       </>
//     )}
//   </SparkleButton>
// </div>

//     )}


//     </div>
//   );
// };

// export default CodeComparison;
// check variables

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
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            🔧 Original Code
          </h3>
          <CodeEditor code={originalCode} readOnly />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-600 mb-2">
            🤖 AI Suggested Fix
          </h3>
          <CodeEditor code={fixedCode} readOnly />
        </div>
      </div>

      {!manuallyAnalyzed && (
        <div className="text-center mt-10">
          <SparkleButton
            onClick={handleCommitFix}
            disabled={fixLoading || isCommitted}
            className={`
              inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full
              ${
                fixLoading || isCommitted
                  ? "bg-gray-200 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-black-800 to-black-500 hover:from-black-600 hover:to-black-600 text-white"
              }
              transition-all duration-300 border-none font-semibold text-sm shadow-sm
            `}
          >
            {fixLoading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Committing...</span>
              </>
            ) : isCommitted ? (
              <span>✅ Fix Committed</span>
            ) : (
              <>
                <img src={SparkImg} alt="GitHub" className="w-4 h-4" />
                <span>Commit AI Fix to GitHub</span>
              </>
            )}
          </SparkleButton>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default CodeComparison;


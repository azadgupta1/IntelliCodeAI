// import { fetchFileContent } from "./githubController.js";
// import analyzeCode from "../utils/aiAnalysis.js";

// export const analyzeGithubFile = async (req, res) => {
//   try {
//     // Extract parameters from request
//     const { owner, repo, commitSha, filePath } = req.params;

//     // Call fetchFileContent to get the file content
//     const fileResponse = await fetchFileContent(req, res, true); // Passing `true` to return data instead of sending response

//     if (!fileResponse || !fileResponse.fileContent) {
//       return res.status(400).json({ message: "Failed to fetch file content for analysis" });
//     }

//     // Call AI analysis function
//     const analysisResult = await analyzeCode(fileResponse.fileContent);

//     res.status(200).json({
//       message: "File analyzed successfully",
//       analysisResult,
//     });
//   } catch (error) {
//     console.error("Error analyzing GitHub file:", error);
//     res.status(500).json({
//       message: "Failed to analyze GitHub file",
//       error: error.message,
//     });
//   }
// };

import { fetchFileContent } from "./githubController.js";
import analyzeCode from "../utils/aiAnalysis.js";

export const analyzeGithubFile = async (req, res) => {
  try {
    const { owner, repo, commitSha, filePath } = req.params;

    // Fetch file content
    const fileResponse = await fetchFileContent(req, res, true); // Ensure this returns content

    if (!fileResponse || !fileResponse.fileContent) {
      console.error("File fetch failed:", fileResponse);
      return res.status(400).json({ message: "Failed to fetch file content for analysis" });
    }

    console.log("Fetched File Content:", fileResponse.fileContent); // ✅ Debug file content

    // Call AI analysis
    const analysisResult = await analyzeCode(fileResponse.fileContent);

    console.log("AI Analysis Result:", analysisResult); // ✅ Debug AI response

    res.status(200).json({
      message: "File analyzed successfully",
      analysisResult,
    });
  } catch (error) {
    console.error("Error analyzing GitHub file:", error);
    res.status(500).json({
      message: "Failed to analyze GitHub file",
      error: error.message,
    });
  }
};



// import path from "path";
// import fs from "fs";
// import prisma from "../config/db.js";
// import analyzeCode from "../utils/aiAnalysis.js"; // Ensure aiAnalysis.js exports `analyzeCode`
// import { fetchFileContent } from "./githubController.js";


// export const analyzeFile = async (req, res) => {
//   try {
//     const { fileId } = req.params; 
//     const numericFileId = parseInt(fileId, 10);

//     // Validate fileId
//     if (isNaN(numericFileId)) {
//       return res.status(400).json({ message: "Invalid file ID" });
//     }

//     // Find the file in the database
//     const file = await prisma.file.findUnique({
//       where: { id: numericFileId },
//     });

//     if (!file) {
//       return res.status(404).json({ message: "File not found in the database" });
//     }

//     // Check if the file exists on the server
//     const filePath = path.resolve("uploads", file.filename); 
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: "File not found on the server" });
//     }

//     console.log("Analyzing file:", filePath);

//     // Read file content
//     const code = fs.readFileSync(filePath, "utf-8");

//     // Analyze the code using AI
//     let analysisResult;
//     try {
//       analysisResult = await analyzeCode(code);
//       console.log("AI analysis result:", analysisResult);
//     } catch (error) {
//       console.error("AI analysis failed:", error);
//       return res.status(500).json({ message: "Failed to analyze code with AI", error: error.message });
//     }

//     // Check if analysis already exists for the file
//     const existingAnalysis = await prisma.analysis.findUnique({
//       where: { fileId: file.id },
//     });

//     if (existingAnalysis) {
//       // Return the existing analysis result
//       return res.status(200).json({
//         message: "Analysis already exists for this file",
//         analysis: existingAnalysis,
//         result: existingAnalysis.result,
//       });
//     }

//     // Store analysis in the database
//     const analysis = await prisma.analysis.create({
//       data: {
//         fileId: file.id,
//         result: analysisResult,
//         commitHash: file.commitHash || "N/A", // Use actual commitHash if available
//         userId: req.user.id,
//       },
//     });

//     res.status(200).json({
//       message: "File analyzed successfully",
//       analysis,
//       result: analysisResult,
//     });
//   } catch (error) {
//     console.error("Analysis Error:", error);
//     res.status(500).json({ message: "Failed to analyze file", error: error.message });
//   }
// };

import path from "path";
import fs from "fs";
import prisma from "../config/db.js";
import analyzeCode from "../utils/aiAnalysis.js";

export const analyzeFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const numericFileId = parseInt(fileId, 10);

    if (isNaN(numericFileId)) {
      return res.status(400).json({ message: "Invalid file ID" });
    }

    const file = await prisma.file.findUnique({
      where: { id: numericFileId },
    });

    if (!file) {
      return res.status(404).json({ message: "File not found in the database" });
    }

    const filePath = path.resolve("uploads", file.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on the server" });
    }

    console.log("Analyzing file:", filePath);
    const code = fs.readFileSync(filePath, "utf-8");

    let analysisResult;
    try {
      analysisResult = await analyzeCode(code);
      console.log("AI analysis result:", analysisResult);
    } catch (error) {
      console.error("AI analysis failed:", error);
      return res.status(500).json({ message: "Failed to analyze code with AI", error: error.message });
    }

    const existingAnalysis = await prisma.analysis.findUnique({
      where: { fileId: file.id },
    });

    if (existingAnalysis) {
      return res.status(200).json({
        message: "Analysis already exists for this file",
        analysis: existingAnalysis,
        result: existingAnalysis.result,
      });
    }

    const analysis = await prisma.analysis.create({
      data: {
        fileId: file.id,
        userId: file.userId, // Fix: Include userId
        result: analysisResult,
        commitHash: "N/A", // Fix: Avoid referencing undefined field
      },
    });

    res.status(200).json({
      message: "File analyzed successfully",
      analysis,
      result: analysisResult,
    });
  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ message: "Failed to analyze file", error: error.message });
  }
};



// Analyze a GitHub file manually
export const analyzeGithubFile = async (req, res) => {
  try {
    console.log("Request Data:", req.body);


      const { owner, repo, commitSha, filePath } = req.body;
      const userId = req.user.id;

      if (!owner || !repo || !commitSha || !filePath) {
          return res.status(400).json({ error: "Missing required fields" });
      }

      // Fetch file content from GitHub
      const fileContent = await fetchFileContent(req, res, true);

      if (!fileContent) {
          return res.status(404).json({ error: "File content could not be fetched" });
      }

      // Perform AI analysis using OpenRouter API
      const analysisResult = await analyzeCode(fileContent);

      // Save analysis result in DB
      const analysis = await prisma.analysis.create({
          data: {
              userId,
              fileId: null, // Since it's from GitHub, no direct fileId
              result: analysisResult,
              commitHash: commitSha,
          },
      });

      res.json({ message: "Analysis completed", analysis });
  } catch (error) {
      console.error("Error analyzing GitHub file:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
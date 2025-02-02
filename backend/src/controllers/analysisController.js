// import path from "path";
// import fs from "fs";
// import prisma from "../config/db.js";
// import analyzeCodeWithAI from "../utils/aiAnalysis.js"; // import the AI function

// export const analyzeFile = async (req, res) => {
//   try {
//     const { fileId } = req.params; // Get fileId from URL params
//     const file = await prisma.file.findUnique({
//       where: { id: parseInt(fileId) },
//     });

//     if (!file) {
//       return res.status(404).json({ message: "File not found" });
//     }

//     const filePath = path.resolve("uploads", file.filename); // Get full file path
//     if (!fs.existsSync(filePath)) {
//       return res.status(404).json({ message: "File not found on the server" });
//     }

//     console.log("File path:", filePath);

//     // Read the file content
//     const code = fs.readFileSync(filePath, "utf-8");

//     // Analyze the code using AI (Codex/GPT-3)
//     const analysisResult = await analyzeCodeWithAI(code);

//     // Save the analysis result to the database
//     const analysis = await prisma.analysis.create({
//       data: {
//         fileId: file.id,
//         result: analysisResult,
//         commitHash: "dummy_commit_hash", // Placeholder, adjust as needed
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
import analyzeCode from "../utils/aiAnalysis.js"; // Ensure aiAnalysis.js exports `analyzeCode`

export const analyzeFile = async (req, res) => {
  try {
    const { fileId } = req.params; 
    const numericFileId = parseInt(fileId, 10);

    // Validate fileId
    if (isNaN(numericFileId)) {
      return res.status(400).json({ message: "Invalid file ID" });
    }

    // Find the file in the database
    const file = await prisma.file.findUnique({
      where: { id: numericFileId },
    });

    if (!file) {
      return res.status(404).json({ message: "File not found in the database" });
    }

    // Check if the file exists on the server
    const filePath = path.resolve("uploads", file.filename); 
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found on the server" });
    }

    console.log("Analyzing file:", filePath);

    // Read file content
    const code = fs.readFileSync(filePath, "utf-8");

    // Analyze the code using AI
    let analysisResult;
    try {
      analysisResult = await analyzeCode(code);
      console.log("AI analysis result:", analysisResult);
    } catch (error) {
      console.error("AI analysis failed:", error);
      return res.status(500).json({ message: "Failed to analyze code with AI", error: error.message });
    }

    // Check if analysis already exists for the file
    const existingAnalysis = await prisma.analysis.findUnique({
      where: { fileId: file.id },
    });

    if (existingAnalysis) {
      // Return the existing analysis result
      return res.status(200).json({
        message: "Analysis already exists for this file",
        analysis: existingAnalysis,
        result: existingAnalysis.result,
      });
    }

    // Store analysis in the database
    const analysis = await prisma.analysis.create({
      data: {
        fileId: file.id,
        result: analysisResult,
        commitHash: file.commitHash || "N/A", // Use actual commitHash if available
        userId: req.user.id,
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

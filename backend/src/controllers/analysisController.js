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
        userId: file.userId || null, // Allow null userId for anonymous uploads
        result: analysisResult,
        commitHash: "N/A", // No Git integration for now
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


    console.log("CHECK   -------------------------      CHECK");
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
      const analysisCount = await analyzeCode(fileContent);

      // const analysisCount = JSON.parse(analysisResult);


      console.log("CHECK 1: ", analysisCount);

        const errorCount = analysisCount.errors ? analysisCount.errors.length : 0;
        const suggestionCount = analysisCount.suggestions ? analysisCount.suggestions.length : 0;
        const optimizationCount = analysisCount.optimizations ? analysisCount.optimizations.length : 0;

        // You can store it in a variable if needed::

        console.log("Error Count IS HERE",errorCount);
        const analysisSummary = {
          errorCount,
          suggestionCount,
          optimizationCount
        };

        console.log(analysisSummary);



      // Save analysis result in DB
      const analysis = await prisma.analysis.create({
          data: {
              userId,
              fileId: null, // Since it's from GitHub, no direct fileId
              result: analysisCount,
              commitHash: commitSha,
              errorCnt: analysisSummary.errorCount,
          },
      });

      console.log(analysis);

      res.json({ message: "Analysis completed", analysis });
  } catch (error) {
      console.error("Error analyzing GitHub file:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};
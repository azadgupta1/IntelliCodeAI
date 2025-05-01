import express from "express";
import { analyzeFile } from "../controllers/analysisController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { getAnalysisHistory, getAnalysisById, ignoreRepoAnalysis, commitAnalysis } from "../controllers/analysisHistoryController.js";

const router = express.Router();

// Route to analyze a file by its ID
router.post("/analyze/:fileId", analyzeFile);

// Fetch all past analyses
router.get("/history", authenticate, getAnalysisHistory);

// Fetch a specific past analysis by ID
router.get("/:id", authenticate, getAnalysisById);


router.post("/ignored-analysis", authenticate, ignoreRepoAnalysis);


router.patch("/:id/commit", authenticate, commitAnalysis);


export default router;

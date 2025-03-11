import express from "express";
import { analyzeFile } from "../controllers/analysisController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { getAnalysisHistory, getAnalysisById } from "../controllers/analysisHistoryController.js";

const router = express.Router();

// Route to analyze a file by its ID
router.post("/analyze/:fileId", analyzeFile);

// Fetch all past analyses
router.get("/history", authenticate, getAnalysisHistory);

// Fetch a specific past analysis by ID
router.get("/:id", authenticate, getAnalysisById);

export default router;

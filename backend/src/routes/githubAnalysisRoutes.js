import express from "express";
import { analyzeGithubFile } from "../controllers/analysisController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to analyze a file from a GitHub commit manually
router.post("/analyze/github", authenticate, analyzeGithubFile);

export default router;

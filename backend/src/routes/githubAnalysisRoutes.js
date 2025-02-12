import express from "express";
import { analyzeGithubFile } from "../controllers/githubAnalysisController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to manually analyze a GitHub file
router.get("/github/analyze/file/:owner/:repo/:commitSha/:filePath", authenticate, analyzeGithubFile);

export default router;

import express from "express";
import { analyzeFile } from "../controllers/analysisController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to analyze a file by its ID
router.post("/analyze/:fileId", authenticate, analyzeFile);

export default router;

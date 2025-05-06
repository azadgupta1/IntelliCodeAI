import express from "express";
import { generateFixedCode } from "../controllers/githubFixController.js";
import { commitFixedCode } from "../controllers/githubFixController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET fixed code for a specific GitHub file
router.get("/github/fix/file/:owner/:repo/:commitSha/:filePath", authenticate, generateFixedCode);

router.post("/commit-fixed-code", authenticate, commitFixedCode);

export default router;


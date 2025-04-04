import express from "express";
import { generateFixedCode } from "../controllers/githubFixController.js";
import { commitFixedCode } from "../controllers/githubFixController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET fixed code for a specific GitHub file
router.get("/github/fix/file/:owner/:repo/:commitSha/:filePath", authenticate, generateFixedCode);

router.post("/commit-fixed-code", authenticate, commitFixedCode);

export default router;




// http://localhost:3000/github/repos/azadgupta1/Feedback-App/commits/0b592f7eeef177b46a8784e747ae9a04259677bf/file/backend%2Fsrc%2Fcontrollers%2FfeedbackController.js
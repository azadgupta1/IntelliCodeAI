import express from "express";
import { fetchUserRepos, fetchCommitDetails, fetchFileContent } from "../controllers/githubController.js";
import { handleGitHubWebhook } from "../controllers/webhookController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to fetch and save user repositories
router.get("/repos", authenticate, fetchUserRepos);

router.get("/repos/:owner/:repo/commits/:commitSha", authenticate, fetchCommitDetails);

router.get("/repos/:owner/:repo/commits/:commitSha/file/:filePath", authenticate, fetchFileContent);


// GitHub Webhook Route (Receives commit events)
router.post("/webhook", express.json({ type: "application/json" }), handleGitHubWebhook);

export default router;

import express from "express";
import { fetchUserRepos, fetchCommitDetails, fetchFileContent, fetchRepoFiles, githubFileAnalysis, enableAutoAnalysisController } from "../controllers/githubController.js";
import { handleGitHubWebhook } from "../controllers/webhookController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/repos", authenticate, fetchUserRepos);

router.get("/repos/:owner/:repo/commits/:commitSha", authenticate, fetchCommitDetails);

router.get("/repos/:owner/:repo/commits/:commitSha/file/:filePath", authenticate, fetchFileContent);

router.get("/repos/:owner/:repo/files", authenticate, fetchRepoFiles);

router.post("/repos/:owner/:repo/analyze", authenticate, githubFileAnalysis);

router.post("/enable-auto-analysis", authenticate, enableAutoAnalysisController);

export default router;

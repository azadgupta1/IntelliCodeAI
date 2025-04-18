import express from "express";
import { fetchUserRepos, fetchCommitDetails, fetchFileContent, fetchRepoFiles, 
    githubFileAnalysis, enableAutoAnalysisController, getAutoAnalysisStatusController,
    getAutoAnalysisRepos, getRepoAnalysisHistory, disableAutoAnalysisController, getRepoById, fetchRepoCommits, 
    fetchPullRequests} from "../controllers/githubController.js";
import { handleGitHubWebhook } from "../controllers/webhookController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/repos", authenticate, fetchUserRepos);

router.get("/repos/:owner/:repo/commits/:commitSha", authenticate, fetchCommitDetails);

router.get("/repos/:owner/:repo/commits/:commitSha/file/:filePath", authenticate, fetchFileContent);

router.get("/repos/:owner/:repo/files", authenticate, fetchRepoFiles);

router.post("/repos/:owner/:repo/analyze", authenticate, githubFileAnalysis);

router.post("/enable-auto-analysis", authenticate, enableAutoAnalysisController);

router.post("/disable-auto-analysis", authenticate, disableAutoAnalysisController);

router.get("/status", authenticate, getAutoAnalysisStatusController);


// ✅ Fetch repositories where auto-analysis is enabled
router.get("/auto-analysis-repos", authenticate, getAutoAnalysisRepos);

// ✅ Fetch analysis history of a specific repo (Renamed to avoid conflicts)
router.get("/repo/:owner/:repo/analysis-history", authenticate, getRepoAnalysisHistory);


router.get("/repos/id/:repoId", authenticate, getRepoById);

router.get("/:owner/:repo/commits", authenticate, fetchRepoCommits);

router.get("/:owner/:repo/pulls", authenticate, fetchPullRequests)

export default router;

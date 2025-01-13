import express from "express";
import { fetchUserRepos } from "../controllers/githubController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to fetch and save user repositories
router.get("/repos", authenticate, fetchUserRepos);

export default router;

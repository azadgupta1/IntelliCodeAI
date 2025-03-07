import express from "express";
import { handleGitHubWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// Webhook endpoint for GitHub commit events
router.post("/github", handleGitHubWebhook);

export default router;

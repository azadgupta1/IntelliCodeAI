import express from "express";
import { handleGitHubWebhook } from "../controllers/webhookController.js";

const router = express.Router();

router.post("/github", express.json(), handleGitHubWebhook);

export default router;

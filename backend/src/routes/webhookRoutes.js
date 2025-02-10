import express from 'express';
import { handleGitHubWebhook } from '../controllers/webhookController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();



router.post("/github/webhook", authenticate, handleGitHubWebhook);


export default router;
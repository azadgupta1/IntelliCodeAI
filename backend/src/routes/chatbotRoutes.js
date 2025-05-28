import express from 'express';
import { handleChatbotMessage } from '../controllers/chatbotController.js';

const router = express.Router();


router.post("/chat", handleChatbotMessage);



export default router;
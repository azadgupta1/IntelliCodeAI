import express from 'express';
import { getRepoErrorHistory } from '../controllers/chartController.js';
import { authenticate } from '../middlewares/authMiddleware.js';


const router = express.Router();



router.get('/repo/:repoId/error-history', authenticate, getRepoErrorHistory);


export default router;
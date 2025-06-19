import express from 'express';
import { createPrompt, getHistory } from '../controllers/promptController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate-prompt', authMiddleware, createPrompt);
router.get('/history', authMiddleware, getHistory);

export default router;
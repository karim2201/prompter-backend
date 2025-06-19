import Prompt from '../models/prompt.js';
import { generatePrompt } from '../services/llamaService.js';

export const createPrompt = async (req, res, next) => {
    const { inputText } = req.body;
    if (!inputText) {
        return res.status(400).json({ error: 'Input text is required' });
    }
    try {
        const generatedPrompt = await generatePrompt(inputText);
        const promptEntry = new Prompt({
            userId: req.user.userId,
            inputText,
            generatedPrompt
        });
        await promptEntry.save();
        res.json({ generatedPrompt });
    } catch (err) {
        next(err);
    }
};

export const getHistory = async (req, res, next) => {
    try {
        const history = await Prompt.find({ userId: req.user.userId }).sort({ timestamp: -1 });
        res.json(history);
    } catch (err) {
        next(err);
    }
};
import { getLlamaSession, generateResponse } from '../config/llama.js';

export const generatePrompt = async (inputText) => {
    const session = getLlamaSession();
    if (!session) {
        throw new Error('Llama session not initialized');
    }
    
    const prompt = `Optimize this description into a professional and effective prompt for an AI model: ${inputText}`;
    
    try {
        // Use the generateResponse function from llama.js instead of session.infer
        const response = await generateResponse(prompt);
        
        if (!response) {
            throw new Error('Model inference failed');
        }
        
        return response.trim();
    } catch (error) {
        console.error('Error in generatePrompt:', error.message);
        throw error;
    }
};
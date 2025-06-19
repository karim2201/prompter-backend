import { getLlama, LlamaChatSession } from "node-llama-cpp";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelPath = path.join(__dirname, '..', 'mistral-7b-instruct-v0.1.Q4_0.gguf');
let llama;
let model;
let context;
let session;

export const initLlama = async () => {
    try {
        console.log('Attempting to load model at:', modelPath);
        
        // Get llama instance
        llama = await getLlama();
        console.log('Llama instance obtained');
        
        // Load model
        model = await llama.loadModel({
            modelPath: modelPath,
        });
        console.log('Model loaded successfully');
        
        // Create context
        context = await model.createContext({
            contextSize: 2048,
        });
        console.log('Context created successfully');
        
        // Create chat session
        session = new LlamaChatSession({
            contextSequence: context.getSequence(),
        });
        console.log('Chat session created successfully');
        
        console.log('Mistral model initialized successfully');
    } catch (err) {
        console.error('Llama initialization error:', err.message);
        throw err;
    }
};

export const generateResponse = async (prompt) => {
    if (!session) {
        throw new Error('Llama session not initialized');
    }
    
    try {
        const response = await session.prompt(prompt, {
            maxTokens: 512,
            temperature: 0.7,
        });
        return response;
    } catch (err) {
        console.error('Error generating response:', err.message);
        throw err;
    }
};

export const getLlamaSession = () => session;
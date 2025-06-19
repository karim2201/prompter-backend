import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    inputText: { type: String, required: true },
    generatedPrompt: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Prompt', promptSchema);
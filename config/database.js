import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true); // Fix deprecation warning
        await mongoose.connect('mongodb://localhost:27017/prompter', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};
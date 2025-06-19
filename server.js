import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import { initLlama } from './config/llama.js';
import authRoutes from './routes/authRoutes.js';
import promptRoutes from './routes/promptRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';

// Initialisation de l'application Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
connectDB();

// Initialisation de Llama
try {
    await initLlama();
    console.log('Llama initialized successfully');
} catch (err) {
    console.error('Failed to initialize Llama:', err);
    process.exit(1);
}

// Routes
app.use('/api', authRoutes);
app.use('/api', promptRoutes);

// Gestion des erreurs
app.use(errorMiddleware);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
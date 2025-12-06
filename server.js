import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from "./src/config/db.js";


import articleRoutes from './src/routes/articleRouter.js';
import authRoutes from './src/routes/authRouter.js';

dotenv.config();
connectDB();

const app = express();


app.use(cors());
app.use(express.json());


// Healthcheck
app.get('/ping', (req, res) => res.json({ status: 'ok' }));


// Routes
app.use('/articles', articleRoutes);
app.use('/users', authRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


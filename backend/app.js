import express from 'express';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', fileRoutes);
app.use('/api', userRoutes);

export default app;

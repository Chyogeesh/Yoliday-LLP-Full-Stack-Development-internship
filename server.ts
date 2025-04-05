// src/server.ts
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import projectsRouter from './routes/projects';
import cartRouter from './routes/cart';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/cart', cartRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

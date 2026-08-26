import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.routes.js';

dotenv.config();

connectDB();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Winera Backend API is running...');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

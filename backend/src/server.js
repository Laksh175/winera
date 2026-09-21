import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import apiRoutes from './routes/api.routes.js';

import fs from 'fs';
import path from 'path';

dotenv.config();

connectDB();

const app = express();

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Auto-serve compressed WebP files for PNG/JPG upload requests
app.use('/uploads', (req, res, next) => {
  if (req.path.match(/\.(png|jpg|jpeg)$/i)) {
    const webpRelPath = req.path.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const fullWebpPath = path.join(process.cwd(), 'uploads', webpRelPath);
    if (fs.existsSync(fullWebpPath)) {
      return res.sendFile(fullWebpPath);
    }
  }
  next();
});

app.use('/uploads', express.static('uploads'));

// Global process error safety guards for production stability
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Winera Backend API is running...');
});

// Global Express Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Global Express Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

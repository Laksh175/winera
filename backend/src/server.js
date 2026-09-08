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
app.use(express.json());

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

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Winera Backend API is running...');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

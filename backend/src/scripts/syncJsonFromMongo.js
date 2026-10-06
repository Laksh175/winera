import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import ArcadeProduct from '../models/ArcadeProduct.js';
import Content from '../models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const syncMongoToJson = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    console.log('🔄 Connecting to MongoDB at:', mongoUri.replace(/:[^:]*@/, ':****@'));
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected.');

    // 1. Fetch all latest products from MongoDB
    const allProducts = await ArcadeProduct.find({}).sort({ createdAt: -1 });
    console.log(`📦 Fetched ${allProducts.length} latest products from MongoDB.`);

    // 2. Fetch CMS categories list
    const contentDoc = await Content.findOne({ sectionKey: 'arcadeCategories' });
    const categoriesList = contentDoc?.data?.categoriesList || [
      "Arcade Games", "Claw Machine", "Redemption Game", "Bike Racing Game",
      "Car Racing Game", "Shooting Games", "VR Games", "Kiddy Ride", "Strength Based Games"
    ];

    const jsonPayload = {
      categoriesList,
      cards: allProducts.map(p => {
        const doc = p.toObject();
        delete doc._id;
        delete doc.__v;
        delete doc.createdAt;
        delete doc.updatedAt;
        return doc;
      })
    };

    // 3. Write to frontend and backend json files
    const frontendPath = path.resolve(__dirname, '../../../frontend/src/data/allArcadeProducts.json');
    const backendPath = path.join(__dirname, '../data/allArcadeProducts.json');

    fs.writeFileSync(frontendPath, JSON.stringify(jsonPayload, null, 2), 'utf8');
    fs.writeFileSync(backendPath, JSON.stringify(jsonPayload, null, 2), 'utf8');

    console.log(`✅ Successfully synced ${allProducts.length} products from MongoDB directly into allArcadeProducts.json!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Sync Error:', error);
    process.exit(1);
  }
};

syncMongoToJson();

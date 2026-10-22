import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import VrGame from '../models/VrGame.js';
import Content from '../models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    console.log('🔄 Connecting to MongoDB at:', mongoUri.replace(/:[^:]*@/, ':****@'));
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully!');

    // Read allVrGames.json
    const jsonPath = path.join(__dirname, '../data/allVrGames.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Data file not found at: ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const catalogData = JSON.parse(rawData);
    const products = catalogData.cards || [];
    const categoriesList = catalogData.categoriesList || [
      "All VR Games", "Bester VR", "Funin VR", "Movie Power", "Oculeap VR"
    ];

    console.log(`📦 Found ${products.length} VR games to insert.`);

    // 1. Insert into dedicated VrGame Collection
    console.log('🗑️  Clearing existing VrGame collection...');
    await VrGame.deleteMany({});

    console.log(`🚀 Inserting ${products.length} VR games into MongoDB...`);
    const seenSlugs = new Set();
    const formattedProducts = products.map((p, idx) => {
      let slug = p.slug || (p.title || `vr-game-${idx}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      if (seenSlugs.has(slug)) {
        slug = `${slug}-${idx + 1}`;
      }
      seenSlugs.add(slug);

      return {
        ...p,
        slug,
        name: p.name || p.title,
        title: p.title || p.name,
        imageUrl: p.img || p.imageUrl || '',
        category: p.category || 'VR Games',
        gallery: Array.isArray(p.gallery) ? p.gallery : (p.img ? [p.img] : [])
      };
    });

    const insertedDocs = await VrGame.insertMany(formattedProducts, { ordered: false });
    console.log(`✅ Successfully inserted ${insertedDocs.length} documents into 'VrGame' collection!`);

    // 2. Also update Content Collection (vrCategories & vrCategoriesData sections)
    console.log('🔄 Updating Content model (vrCategories & vrCategoriesData sections)...');
    await Content.findOneAndUpdate(
      { sectionKey: 'vrCategories' },
      {
        sectionKey: 'vrCategories',
        data: {
          categoriesList,
          cards: formattedProducts
        }
      },
      { upsert: true, new: true }
    );
    await Content.findOneAndUpdate(
      { sectionKey: 'vrCategoriesData' },
      {
        sectionKey: 'vrCategoriesData',
        data: {
          categoriesList,
          cards: formattedProducts
        }
      },
      { upsert: true, new: true }
    );
    console.log('✅ Content model vrCategories & vrCategoriesData updated successfully!');

    console.log('🎉 VR Games Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during VR games seeding:', error);
    process.exit(1);
  }
};

seedDatabase();

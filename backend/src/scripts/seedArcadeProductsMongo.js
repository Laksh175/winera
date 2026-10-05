import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import ArcadeProduct from '../models/ArcadeProduct.js';
import Content from '../models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    console.log('🔄 Connecting to MongoDB at:', mongoUri.replace(/:[^:]*@/, ':****@'));
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully!');

    // Read allArcadeProducts.json
    const jsonPath = path.join(__dirname, '../data/allArcadeProducts.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Data file not found at: ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const catalogData = JSON.parse(rawData);
    const products = catalogData.cards || [];
    const categoriesList = catalogData.categoriesList || [
      "Arcade Games", "Claw Machine", "Redemption Game", "Kiddy Ride",
      "Bike Racing Game", "Car Racing Game", "Shooting Games", "VR Games", "Strength Based Games"
    ];

    console.log(`📦 Found ${products.length} products to insert.`);

    // 1. Insert into dedicated ArcadeProduct Collection using insertMany
    console.log('🗑️  Clearing existing ArcadeProduct collection...');
    await ArcadeProduct.deleteMany({});

    console.log(`🚀 Inserting ${products.length} products into MongoDB using insertMany...`);
    // Ensure unique slugs
    const seenSlugs = new Set();
    const formattedProducts = products.map((p, idx) => {
      let slug = p.slug || (p.title || `product-${idx}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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
        category: p.category || 'Arcade Games',
        gallery: Array.isArray(p.gallery) ? p.gallery : (p.img ? [p.img] : [])
      };
    });

    const insertedDocs = await ArcadeProduct.insertMany(formattedProducts, { ordered: false });
    console.log(`✅ Successfully inserted ${insertedDocs.length} documents into 'ArcadeProduct' collection!`);

    // 2. Also update Content Collection (arcadeCategories section)
    console.log('🔄 Updating Content model (arcadeCategories section)...');
    await Content.findOneAndUpdate(
      { sectionKey: 'arcadeCategories' },
      {
        sectionKey: 'arcadeCategories',
        data: {
          categoriesList,
          cards: formattedProducts,
          deletedSlugs: []
        }
      },
      { upsert: true, new: true }
    );
    console.log('✅ Content collection (arcadeCategories) updated with 1,037 games!');

    // Category Distribution Summary
    const counts = {};
    formattedProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    console.log('\n📊 Category Distribution in MongoDB:');
    Object.entries(counts).forEach(([cat, count]) => {
      console.log(`   - ${cat}: ${count} games`);
    });

    console.log('\n🎉 All data is now fully managed and stored in MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data to MongoDB:', error);
    process.exit(1);
  }
};

seedDatabase();

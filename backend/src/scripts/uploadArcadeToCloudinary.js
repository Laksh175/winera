import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

import ArcadeProduct from '../models/ArcadeProduct.js';
import Content from '../models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadArcadeImages = async () => {
  try {
    console.log('☁️  Connecting to Cloudinary:', process.env.CLOUDINARY_CLOUD_NAME);
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    console.log('🔄 Connecting to MongoDB at:', mongoUri.replace(/:[^:]*@/, ':****@'));
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected.');

    const localImagesDir = path.resolve(__dirname, '../../../frontend/public/uploads/arcade_products');
    const fallbackDir = path.resolve(__dirname, '../../uploads/arcade_products');
    const sourceDir = fs.existsSync(localImagesDir) ? localImagesDir : fallbackDir;

    if (!fs.existsSync(sourceDir)) {
      throw new Error(`Images directory not found at ${sourceDir}`);
    }

    const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));
    console.log(`📁 Found ${files.length} images in ${sourceDir}`);

    // Load existing mapping if available for resume support
    const mappingPath = path.join(__dirname, '../data/cloudinaryArcadeMapping.json');
    let mapping = {};
    if (fs.existsSync(mappingPath)) {
      try {
        mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
        console.log(`⚡ Loaded ${Object.keys(mapping).length} already uploaded Cloudinary URLs.`);
      } catch (e) {}
    }

    const pendingFiles = files.filter(f => !mapping[f]);
    console.log(`⏳ ${pendingFiles.length} images remaining to upload to Cloudinary.`);

    const CONCURRENCY = 15;
    let uploadedCount = Object.keys(mapping).length;

    for (let i = 0; i < pendingFiles.length; i += CONCURRENCY) {
      const chunk = pendingFiles.slice(i, i + CONCURRENCY);
      await Promise.all(
        chunk.map(async (filename) => {
          const filePath = path.join(sourceDir, filename);
          const publicId = path.basename(filename, path.extname(filename));
          try {
            const res = await cloudinary.uploader.upload(filePath, {
              folder: 'winera_arcade_products',
              public_id: publicId,
              overwrite: false,
              resource_type: 'image',
              format: 'webp'
            });
            mapping[filename] = res.secure_url;
            uploadedCount++;
            if (uploadedCount % 25 === 0 || uploadedCount === files.length) {
              console.log(`[${uploadedCount}/${files.length}] Uploaded: ${filename} -> ${res.secure_url}`);
              fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8');
            }
          } catch (err) {
            console.error(`❌ Failed to upload ${filename}:`, err.message);
          }
        })
      );
    }

    // Save final mapping
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8');
    console.log(`\n🎉 Total ${Object.keys(mapping).length} images uploaded to Cloudinary successfully!`);

    // 1. Update backend and frontend allArcadeProducts.json with Cloudinary URLs
    console.log('\n🔄 Updating allArcadeProducts.json with Cloudinary URLs...');
    const backendJsonPath = path.join(__dirname, '../data/allArcadeProducts.json');
    const frontendJsonPath = path.resolve(__dirname, '../../../frontend/src/data/allArcadeProducts.json');

    [backendJsonPath, frontendJsonPath].forEach(targetPath => {
      if (fs.existsSync(targetPath)) {
        const raw = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
        const cards = (raw.cards || []).map(card => {
          let currentImg = card.img || card.imageUrl || '';
          const filename = currentImg.split('/').pop();
          if (filename && mapping[filename]) {
            const cloudUrl = mapping[filename];
            return {
              ...card,
              img: cloudUrl,
              imageUrl: cloudUrl,
              gallery: Array.isArray(card.gallery) ? card.gallery.map(g => mapping[g.split('/').pop()] || g) : [cloudUrl]
            };
          }
          return card;
        });

        raw.cards = cards;
        fs.writeFileSync(targetPath, JSON.stringify(raw, null, 2), 'utf8');
        console.log(`✅ Updated ${targetPath} with Cloudinary URLs!`);
      }
    });

    // 2. Update MongoDB ArcadeProduct collection
    console.log('\n🔄 Updating MongoDB ArcadeProduct collection with Cloudinary URLs...');
    const allProducts = await ArcadeProduct.find({});
    let updatedProductsCount = 0;
    for (const prod of allProducts) {
      let currentImg = prod.img || prod.imageUrl || '';
      const filename = currentImg.split('/').pop();
      if (filename && mapping[filename]) {
        const cloudUrl = mapping[filename];
        prod.img = cloudUrl;
        prod.imageUrl = cloudUrl;
        prod.gallery = [cloudUrl];
        await prod.save();
        updatedProductsCount++;
      }
    }
    console.log(`✅ Updated ${updatedProductsCount} documents in 'ArcadeProduct' MongoDB collection!`);

    // 3. Update Content collection (arcadeCategories)
    console.log('🔄 Updating Content collection (arcadeCategories)...');
    const contentDoc = await Content.findOne({ sectionKey: 'arcadeCategories' });
    if (contentDoc && contentDoc.data && Array.isArray(contentDoc.data.cards)) {
      contentDoc.data.cards = contentDoc.data.cards.map(card => {
        let currentImg = card.img || card.imageUrl || '';
        const filename = currentImg.split('/').pop();
        if (filename && mapping[filename]) {
          const cloudUrl = mapping[filename];
          return {
            ...card,
            img: cloudUrl,
            imageUrl: cloudUrl,
            gallery: [cloudUrl]
          };
        }
        return card;
      });
      contentDoc.markModified('data');
      await contentDoc.save();
      console.log('✅ Updated Content collection (arcadeCategories) with Cloudinary URLs!');
    }

    console.log('\n🌟 Complete Cloudinary Migration Finished Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration Error:', error);
    process.exit(1);
  }
};

uploadArcadeImages();

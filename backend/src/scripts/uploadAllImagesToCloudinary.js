import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadBatch = async (files, sourceDir, folderName, mappingPath) => {
  let mapping = {};
  if (fs.existsSync(mappingPath)) {
    try {
      mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
    } catch (e) {}
  }

  const pending = files.filter(f => !mapping[f]);
  console.log(`\n☁️  [${folderName}] Total files: ${files.length} | Already uploaded: ${Object.keys(mapping).length} | Remaining: ${pending.length}`);

  const CONCURRENCY = 12;
  let count = Object.keys(mapping).length;

  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    const chunk = pending.slice(i, i + CONCURRENCY);
    await Promise.all(
      chunk.map(async (filename) => {
        const filePath = path.join(sourceDir, filename);
        const publicId = path.basename(filename, path.extname(filename));
        try {
          const res = await cloudinary.uploader.upload(filePath, {
            folder: folderName,
            public_id: publicId,
            overwrite: false,
            resource_type: 'image'
          });
          mapping[filename] = res.secure_url;
          count++;
          if (count % 25 === 0 || count === files.length) {
            console.log(`[${count}/${files.length}] Uploaded ${filename}`);
            fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8');
          }
        } catch (err) {
          console.error(`❌ Failed: ${filename}: ${err.message}`);
        }
      })
    );
  }

  fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2), 'utf8');
  console.log(`✅ [${folderName}] Completed! Total mapped: ${Object.keys(mapping).length}`);
  return mapping;
};

const main = async () => {
  try {
    console.log('🚀 Starting Cloudinary Sync for Arcade & VR Games...');

    // 1. ARCADE PRODUCTS
    const arcadeSourceDir = path.resolve(__dirname, '../../../frontend/public/uploads/arcade_products');
    const arcadeMappingPath = path.join(__dirname, '../data/cloudinaryArcadeMapping.json');
    if (fs.existsSync(arcadeSourceDir)) {
      const arcadeFiles = fs.readdirSync(arcadeSourceDir).filter(f => !f.startsWith('.'));
      const arcadeMap = await uploadBatch(arcadeFiles, arcadeSourceDir, 'winera_arcade_products', arcadeMappingPath);

      // Update allArcadeProducts.json (frontend & backend)
      const arcadeJsonTargets = [
        path.join(__dirname, '../data/allArcadeProducts.json'),
        path.resolve(__dirname, '../../../frontend/src/data/allArcadeProducts.json')
      ];

      arcadeJsonTargets.forEach(tgt => {
        if (fs.existsSync(tgt)) {
          const data = JSON.parse(fs.readFileSync(tgt, 'utf8'));
          data.cards = (data.cards || []).map(card => {
            const mainName = (card.img || card.imageUrl || '').split('/').pop();
            const cloudMain = arcadeMap[mainName] || card.img || card.imageUrl;
            const updatedGallery = Array.isArray(card.gallery)
              ? card.gallery.map(g => arcadeMap[g.split('/').pop()] || g)
              : [cloudMain];
            return {
              ...card,
              img: cloudMain,
              imageUrl: cloudMain,
              gallery: updatedGallery
            };
          });
          fs.writeFileSync(tgt, JSON.stringify(data, null, 2), 'utf8');
          console.log(`💾 Updated Arcade JSON at: ${tgt}`);
        }
      });
    }

    // 2. VR GAMES
    const vrSourceDir = path.resolve(__dirname, '../../../frontend/public/assets/vr-game-images');
    const vrMappingPath = path.join(__dirname, '../data/cloudinaryVrMapping.json');
    if (fs.existsSync(vrSourceDir)) {
      const vrFiles = fs.readdirSync(vrSourceDir).filter(f => !f.startsWith('.'));
      const vrMap = await uploadBatch(vrFiles, vrSourceDir, 'winera_vr_games', vrMappingPath);

      // Update allVrGames.json (frontend & backend) & allVrGames.js
      const vrJsonTargets = [
        path.join(__dirname, '../data/allVrGames.json'),
        path.resolve(__dirname, '../../../frontend/src/data/allVrGames.json')
      ];

      let lastVrData = null;
      vrJsonTargets.forEach(tgt => {
        if (fs.existsSync(tgt)) {
          const data = JSON.parse(fs.readFileSync(tgt, 'utf8'));
          data.cards = (data.cards || []).map(card => {
            const mainName = (card.img || card.imageUrl || '').split('/').pop();
            const cloudMain = vrMap[mainName] || card.img || card.imageUrl;
            const updatedGallery = Array.isArray(card.gallery)
              ? card.gallery.map(g => vrMap[g.split('/').pop()] || g)
              : [cloudMain];
            return {
              ...card,
              img: cloudMain,
              imageUrl: cloudMain,
              gallery: updatedGallery
            };
          });
          lastVrData = data;
          fs.writeFileSync(tgt, JSON.stringify(data, null, 2), 'utf8');
          console.log(`💾 Updated VR JSON at: ${tgt}`);
        }
      });

      const vrJsPath = path.resolve(__dirname, '../../../frontend/src/data/allVrGames.js');
      if (lastVrData && fs.existsSync(vrJsPath)) {
        const jsContent = `export const allVrGames = ${JSON.stringify(lastVrData, null, 2)};\nexport default allVrGames;\n`;
        fs.writeFileSync(vrJsPath, jsContent, 'utf8');
        console.log(`💾 Updated VR JS file at: ${vrJsPath}`);
      }
    }

    // 3. Connect to MongoDB and update documents if connected
    try {
      const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
      console.log('✅ Connected to MongoDB, updating collections...');
      
      const ArcadeProduct = (await import('../models/ArcadeProduct.js')).default;
      const Content = (await import('../models/Content.js')).default;
      
      const arcadeMap = JSON.parse(fs.readFileSync(arcadeMappingPath, 'utf8'));
      const prods = await ArcadeProduct.find({});
      for (const p of prods) {
        const fname = (p.img || p.imageUrl || '').split('/').pop();
        if (fname && arcadeMap[fname]) {
          p.img = arcadeMap[fname];
          p.imageUrl = arcadeMap[fname];
          await p.save();
        }
      }
      console.log(`✅ Synced ${prods.length} Arcade products in MongoDB.`);
      await mongoose.disconnect();
    } catch (dbErr) {
      console.log('ℹ️  MongoDB update skipped (or server offline):', dbErr.message);
    }

    console.log('\n🎉 ALL IMAGES SUCCESSFULLY UPLOADED TO CLOUDINARY & SYNCHRONIZED!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Fatal error:', err);
    process.exit(1);
  }
};

main();

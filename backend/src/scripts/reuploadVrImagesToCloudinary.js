import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const vrSourceDir = path.resolve(__dirname, '../../../frontend/public/assets/vr-game-images');
const vrMappingPath = path.join(__dirname, '../data/cloudinaryVrMapping.json');

const CONCURRENCY = 10;

async function run() {
  console.log('🚀 Starting clean VR Games re-upload to Cloudinary from VR Game List.xls images...');
  
  const files = fs.readdirSync(vrSourceDir).filter(f => !f.startsWith('.'));
  console.log(`Found ${files.length} images in ${vrSourceDir}`);

  let mapping = {};
  if (fs.existsSync(vrMappingPath)) {
    try {
      mapping = JSON.parse(fs.readFileSync(vrMappingPath, 'utf8'));
    } catch (e) {}
  }

  // We will force-upload with overwrite: true
  let completed = 0;
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const chunk = files.slice(i, i + CONCURRENCY);
    await Promise.all(
      chunk.map(async (filename) => {
        const filePath = path.join(vrSourceDir, filename);
        const ext = path.extname(filename);
        const baseName = path.basename(filename, ext);
        // Include extension in publicId if needed to avoid format clashes
        const publicId = `${baseName}_vr`;

        try {
          const res = await cloudinary.uploader.upload(filePath, {
            folder: 'winera_vr_games_v2',
            public_id: publicId,
            overwrite: true,
            invalidate: true,
            resource_type: 'image'
          });

          mapping[filename] = res.secure_url;
          mapping[baseName] = res.secure_url;
          completed++;
          if (completed % 25 === 0 || completed === files.length) {
            console.log(`[${completed}/${files.length}] Uploaded: ${filename} => ${res.secure_url}`);
            fs.writeFileSync(vrMappingPath, JSON.stringify(mapping, null, 2), 'utf8');
          }
        } catch (err) {
          console.error(`❌ Error uploading ${filename}:`, err.message);
        }
      })
    );
  }

  fs.writeFileSync(vrMappingPath, JSON.stringify(mapping, null, 2), 'utf8');
  console.log(`✅ All ${completed} VR images uploaded to Cloudinary!`);

  // Update allVrGames.json and allVrGames.js
  const vrTargets = [
    path.join(__dirname, '../data/allVrGames.json'),
    path.resolve(__dirname, '../../../frontend/src/data/allVrGames.json')
  ];

  let freshVrData = null;
  vrTargets.forEach(tgt => {
    if (fs.existsSync(tgt)) {
      const data = JSON.parse(fs.readFileSync(tgt, 'utf8'));
      data.cards = (data.cards || []).map(card => {
        const mainFilename = (card.img || card.imageUrl || '').split('/').pop();
        const mainBase = mainFilename.replace(/\.[^.]+$/, '');
        const cloudMain = mapping[mainFilename] || mapping[mainBase] || card.img;

        const updatedGallery = Array.isArray(card.gallery)
          ? card.gallery.map(g => {
              const gName = g.split('/').pop();
              const gBase = gName.replace(/\.[^.]+$/, '');
              return mapping[gName] || mapping[gBase] || g;
            })
          : [cloudMain];

        return {
          ...card,
          img: cloudMain,
          imageUrl: cloudMain,
          gallery: updatedGallery
        };
      });

      freshVrData = data;
      fs.writeFileSync(tgt, JSON.stringify(data, null, 2), 'utf8');
      console.log(`💾 Updated VR JSON at: ${tgt}`);
    }
  });

  const vrJsPath = path.resolve(__dirname, '../../../frontend/src/data/allVrGames.js');
  if (freshVrData && fs.existsSync(vrJsPath)) {
    const jsContent = `export const allVrGames = ${JSON.stringify(freshVrData, null, 2)};\nexport default allVrGames;\n`;
    fs.writeFileSync(vrJsPath, jsContent, 'utf8');
    console.log(`💾 Updated VR JS file at: ${vrJsPath}`);
  }

  // Also update VR games referenced in allArcadeProducts.json
  const arcadeTargets = [
    path.join(__dirname, '../data/allArcadeProducts.json'),
    path.resolve(__dirname, '../../../frontend/src/data/allArcadeProducts.json')
  ];
  arcadeTargets.forEach(tgt => {
    if (fs.existsSync(tgt)) {
      const data = JSON.parse(fs.readFileSync(tgt, 'utf8'));
      data.cards = (data.cards || []).map(card => {
        const fName = (card.img || card.imageUrl || '').split('/').pop();
        const fBase = fName.replace(/\.[^.]+$/, '');
        if (mapping[fName] || mapping[fBase]) {
          const newUrl = mapping[fName] || mapping[fBase];
          return {
            ...card,
            img: newUrl,
            imageUrl: newUrl,
            gallery: Array.isArray(card.gallery) ? card.gallery.map(g => {
              const gn = g.split('/').pop();
              return mapping[gn] || mapping[gn.replace(/\.[^.]+$/, '')] || g;
            }) : [newUrl]
          };
        }
        return card;
      });
      fs.writeFileSync(tgt, JSON.stringify(data, null, 2), 'utf8');
      console.log(`💾 Updated Arcade JSON VR entries at: ${tgt}`);
    }
  });

  // Sync to local MongoDB
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    await mongoose.connect(mongoUri);
    console.log('Connected to local MongoDB. Updating VrGame collection...');
    const VrGame = (await import('../models/VrGame.js')).default;
    await VrGame.deleteMany({});
    if (freshVrData?.cards) {
      await VrGame.insertMany(freshVrData.cards);
      console.log(`✅ Inserted ${freshVrData.cards.length} VR games into local MongoDB VrGame collection.`);
    }
    await mongoose.disconnect();
  } catch (dbErr) {
    console.error('Local Mongo error:', dbErr.message);
  }

  console.log('🎉 VR Game upload and sync complete!');
}

run().catch(console.error);

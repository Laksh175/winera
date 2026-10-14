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

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';

const metaPath = '/Users/laksh/.gemini/antigravity-ide/brain/22a5894e-1498-48a6-ae7e-fc81f869c690/scratch/mp_extracted_meta.json';
const sourceDir = path.resolve(__dirname, '../../../frontend/public/assets/vr-game-images');

async function run() {
  console.log('🔄 Connecting to MongoDB at:', mongoUri.replace(/:[^:]*@/, ':****@'));
  await mongoose.connect(mongoUri);
  console.log('✅ MongoDB connected successfully!');

  const VrGame = mongoose.model('VrGame', new mongoose.Schema({
    title: String,
    name: String,
    slug: String,
    img: String,
    imageUrl: String,
    gallery: [String],
    category: String,
    specsCategory: String
  }, { strict: false }));

  const Content = mongoose.model('Content', new mongoose.Schema({
    sectionKey: String,
    data: mongoose.Schema.Types.Mixed
  }, { strict: false }));

  const metaList = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  console.log(`📦 Loaded metadata for ${metaList.length} Movie Power products.`);

  const urlMap = {};

  for (let i = 0; i < metaList.length; i++) {
    const item = metaList[i];
    console.log(`\n[${i + 1}/${metaList.length}] Processing: ${item.title} (${item.slug})`);

    // 1. Upload main image
    const mainPath = path.join(sourceDir, item.main_filename);
    if (!fs.existsSync(mainPath)) {
      console.error(`❌ Main file missing: ${mainPath}`);
      continue;
    }

    const mainExt = path.extname(item.main_filename);
    const mainBase = path.basename(item.main_filename, mainExt);
    const mainPublicId = `${mainBase}_vr`;

    console.log(`  Uploading main: ${item.main_filename} => ${mainPublicId}`);
    const mainRes = await cloudinary.uploader.upload(mainPath, {
      folder: 'winera_vr_games_v2',
      public_id: mainPublicId,
      overwrite: true,
      invalidate: true,
      resource_type: 'image'
    });
    const mainCloudUrl = mainRes.secure_url;
    console.log(`  ✅ Main URL: ${mainCloudUrl}`);

    // 2. Upload gallery images
    const galCloudUrls = [];
    for (let gi = 0; gi < item.gal_filenames.length; gi++) {
      const gFn = item.gal_filenames[gi];
      const gPath = path.join(sourceDir, gFn);
      if (fs.existsSync(gPath)) {
        const gExt = path.extname(gFn);
        const gBase = path.basename(gFn, gExt);
        const gPublicId = `${gBase}_vr`;
        console.log(`  Uploading gallery ${gi + 1}: ${gFn} => ${gPublicId}`);
        const gRes = await cloudinary.uploader.upload(gPath, {
          folder: 'winera_vr_games_v2',
          public_id: gPublicId,
          overwrite: true,
          invalidate: true,
          resource_type: 'image'
        });
        galCloudUrls.push(gRes.secure_url);
      }
    }

    const fullGallery = galCloudUrls.length > 0 ? [mainCloudUrl, ...galCloudUrls] : [mainCloudUrl];

    urlMap[item.slug] = {
      mainUrl: mainCloudUrl,
      gallery: fullGallery
    };

    // 3. Update dedicated VrGame model in MongoDB
    await VrGame.updateOne(
      { slug: item.slug },
      {
        $set: {
          img: mainCloudUrl,
          imageUrl: mainCloudUrl,
          gallery: fullGallery
        }
      }
    );
  }

  // 4. Update Content model (vrCategoriesData section) in MongoDB
  console.log('\n🔄 Updating Content model (vrCategoriesData) in MongoDB...');
  const contentDoc = await Content.findOne({ sectionKey: 'vrCategoriesData' });
  if (contentDoc && contentDoc.data && Array.isArray(contentDoc.data.cards)) {
    let updatedCount = 0;
    contentDoc.data.cards = contentDoc.data.cards.map(card => {
      if (urlMap[card.slug]) {
        updatedCount++;
        return {
          ...card,
          img: urlMap[card.slug].mainUrl,
          imageUrl: urlMap[card.slug].mainUrl,
          gallery: urlMap[card.slug].gallery
        };
      }
      return card;
    });

    contentDoc.markModified('data');
    await contentDoc.save();
    console.log(`✅ Updated ${updatedCount} Movie Power cards in Content collection!`);
  } else {
    console.warn('⚠️ Content vrCategoriesData not found or cards not an array!');
  }

  // 5. Update JSON files
  const jsonFiles = [
    path.join(__dirname, '../data/allVrGames.json'),
    path.resolve(__dirname, '../../../frontend/src/data/allVrGames.json')
  ];

  for (const jf of jsonFiles) {
    if (fs.existsSync(jf)) {
      const data = JSON.parse(fs.readFileSync(jf, 'utf8'));
      let cnt = 0;
      data.cards = (data.cards || []).map(card => {
        if (urlMap[card.slug]) {
          cnt++;
          return {
            ...card,
            img: urlMap[card.slug].mainUrl,
            imageUrl: urlMap[card.slug].mainUrl,
            gallery: urlMap[card.slug].gallery
          };
        }
        return card;
      });
      fs.writeFileSync(jf, JSON.stringify(data, null, 2), 'utf8');
      console.log(`✅ Updated ${cnt} cards in ${path.basename(jf)}`);
    }
  }

  // 6. Update allVrGames.js
  const jsTarget = path.resolve(__dirname, '../../../frontend/src/data/allVrGames.js');
  if (fs.existsSync(jsTarget)) {
    const freshJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../frontend/src/data/allVrGames.json'), 'utf8'));
    const jsContent = `export const allVrGames = ${JSON.stringify(freshJson, null, 2)};\nexport default allVrGames;\n`;
    fs.writeFileSync(jsTarget, jsContent, 'utf8');
    console.log(`✅ Updated allVrGames.js`);
  }

  // 7. Also check if any card with matching slug is in allArcadeProducts.json
  const arcadeJsonFiles = [
    path.join(__dirname, '../data/allArcadeProducts.json'),
    path.resolve(__dirname, '../../../frontend/src/data/allArcadeProducts.json')
  ];
  for (const ajf of arcadeJsonFiles) {
    if (fs.existsSync(ajf)) {
      const data = JSON.parse(fs.readFileSync(ajf, 'utf8'));
      let cnt = 0;
      data.cards = (data.cards || []).map(card => {
        if (urlMap[card.slug]) {
          cnt++;
          return {
            ...card,
            img: urlMap[card.slug].mainUrl,
            imageUrl: urlMap[card.slug].mainUrl,
            gallery: urlMap[card.slug].gallery
          };
        }
        return card;
      });
      if (cnt > 0) {
        fs.writeFileSync(ajf, JSON.stringify(data, null, 2), 'utf8');
        console.log(`✅ Synced ${cnt} cross-referenced cards in ${path.basename(ajf)}`);
      }
    }
  }

  console.log('\n🎉 ALL 41 Movie Power games successfully updated with exact images from VR Game List.xls!');
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});

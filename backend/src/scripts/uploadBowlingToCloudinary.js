import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';

const ContentSchema = new mongoose.Schema(
  {
    sectionKey: { type: String, required: true, unique: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
);

const Content = mongoose.models.Content || mongoose.model('Content', ContentSchema);

const assetsDir = path.resolve(__dirname, '../../../frontend/src/assets');

const filesToUpload = [
  'bowlling-hero-bg.webp',
  'bowling-hero-bg.webp',
  'bowling-mobile-image.png',
  'bowling.webp',
  'bowling-pins-explode.webp',
  'Mask-group.webp',
  'Mask-group-01.webp',
  'bowling-ball-pins-blue.webp',
  'bowlling-bg.webp',
  'bowling-types-bg.webp',
  'bowling-last-image-bg.webp',
  'cta-banner-bg.png',
  'download-button.png',
  'bowlling-button-shape.png',
  'cta-button-3.png',
  'bowlling-design.png',
  'bowlling-image.png',
  'talk-to-roi-button.png',
  'yellow-stroke-line.webp'
];

async function run() {
  console.log('--- Step 1: Uploading Bowling Alley Assets to Cloudinary ---');
  const uploadedUrls = {};

  for (const filename of filesToUpload) {
    const filePath = path.join(assetsDir, filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    console.log(`Uploading ${filename}...`);
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'winera_uploads',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
      });
      let optUrl = res.secure_url;
      if (optUrl && optUrl.includes('/upload/') && !optUrl.includes('/f_auto,q_auto/')) {
        optUrl = optUrl.replace('/upload/', '/upload/f_auto,q_auto/');
      }
      uploadedUrls[filename] = optUrl;
      console.log(`✓ ${filename} -> ${optUrl}`);
    } catch (err) {
      console.error(`✗ Error uploading ${filename}:`, err.message);
    }
  }

  console.log('\n--- Step 2: Safely Syncing MongoDB (Protecting Admin Changes) ---');
  await mongoose.connect(mongoURI);
  console.log('Connected to MongoDB.');

  const sectionDefaults = [
    {
      sectionKey: 'bowlingHero',
      fields: {
        breadcrumbText: 'Bowling',
        bgUrl: uploadedUrls['bowlling-hero-bg.webp'] || uploadedUrls['bowling-hero-bg.webp'] || ''
      }
    },
    {
      sectionKey: 'bowlingIntro',
      fields: {
        mainImgUrl: uploadedUrls['bowling.webp'] || '',
        imgUrl: uploadedUrls['bowling.webp'] || ''
      }
    },
    {
      sectionKey: 'bowlingManufacturer',
      fields: {
        mainImgUrl: uploadedUrls['bowling-pins-explode.webp'] || '',
        imgUrl: uploadedUrls['bowling-pins-explode.webp'] || ''
      }
    },
    {
      sectionKey: 'bowlingFreeFall',
      fields: {
        mainImgUrl: uploadedUrls['Mask-group.webp'] || '',
        imgUrl: uploadedUrls['Mask-group.webp'] || '',
        videoBtnBg: uploadedUrls['cta-banner-bg.png'] || ''
      }
    },
    {
      sectionKey: 'bowlingString',
      fields: {
        mainImgUrl: uploadedUrls['Mask-group-01.webp'] || '',
        imgUrl: uploadedUrls['Mask-group-01.webp'] || ''
      }
    },
    {
      sectionKey: 'bowlingRoi',
      fields: {
        mainImgUrl: uploadedUrls['bowlling-image.png'] || '',
        imgUrl: uploadedUrls['bowlling-image.png'] || '',
        btnBg: uploadedUrls['talk-to-roi-button.png'] || ''
      }
    },
    {
      sectionKey: 'bowlingWhyUs',
      fields: {
        mainImgUrl: uploadedUrls['bowling-ball-pins-blue.webp'] || '',
        graphicUrl: uploadedUrls['bowling-ball-pins-blue.webp'] || '',
        imgUrl: uploadedUrls['bowling-ball-pins-blue.webp'] || ''
      }
    },
    {
      sectionKey: 'bowlingCta',
      fields: {
        btnBg: uploadedUrls['cta-button-3.png'] || ''
      }
    }
  ];

  for (const { sectionKey, fields } of sectionDefaults) {
    const existing = await Content.findOne({ sectionKey });
    let updatedData = existing ? { ...existing.data } : {};

    let modified = false;
    for (const [key, value] of Object.entries(fields)) {
      if (!value) continue;
      // If key already exists and has a custom value (and not empty), do NOT overwrite (protect Admin changes!)
      if (existing && existing.data && existing.data[key] && typeof existing.data[key] === 'string' && existing.data[key].trim() !== '') {
        console.log(`[PRESERVED] ${sectionKey}.${key} already set by Admin: "${existing.data[key]}"`);
      } else {
        updatedData[key] = value;
        modified = true;
        console.log(`[UPDATED] ${sectionKey}.${key} -> ${value}`);
      }
    }

    if (modified || !existing) {
      await Content.findOneAndUpdate(
        { sectionKey },
        { sectionKey, data: updatedData },
        { upsert: true, new: true }
      );
      console.log(`✓ Saved ${sectionKey} to MongoDB.`);
    }
  }

  console.log('\n--- Step 3: Done! All bowling images are now securely on Cloudinary and MongoDB without touching any live admin edits. ---');
  console.log('Uploaded Map:', JSON.stringify(uploadedUrls, null, 2));

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error('Fatal Error:', err);
  process.exit(1);
});

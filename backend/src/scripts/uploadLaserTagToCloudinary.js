import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import Content from '../models/Content.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';

const assetsDir = path.resolve('../frontend/src/assets');

const laserTagFiles = [
  'laser-tag-1.png',
  'laser-tag-2.png',
  'laser-tag-3.png',
  'laser-tag-3-border.png',
  'laser-tag-4.png',
  'laser-tag-5.png',
  'laser-tag-5-icon.png',
  'laser-tag-6.png',
  'laser-tag-6-2.png',
  'laser-tag-6-bg.png',
  'laser-tag-6-button.png',
  'laser-tag-7.png',
  'laser-tag-7-bg.png',
  'laser-tag-bg-3.png',
  'laser-6-icon1.png',
  'laser-6-icon2.png',
  'laser-6-icon3.png',
  'laser-6-icon4.png',
  'lasr-6-icon5.png'
];

async function uploadAndSync() {
  console.log('--- Step 1: Uploading Laser Tag Assets to Cloudinary ---');
  const uploadedUrls = {};

  for (const filename of laserTagFiles) {
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

  console.log('\n--- Step 2: Syncing MongoDB Content Documents ---');
  await mongoose.connect(mongoURI);
  console.log('Connected to MongoDB.');

  const sectionUpdates = [
    {
      sectionKey: 'lasertagIntro',
      fields: {
        mainImgUrl: uploadedUrls['laser-tag-1.png'] || ''
      }
    },
    {
      sectionKey: 'lasertagSetup',
      fields: {
        mainImgUrl: uploadedUrls['laser-tag-2.png'] || ''
      }
    },
    {
      sectionKey: 'lasertagGroups',
      fields: {
        mainImgUrl: uploadedUrls['laser-tag-3.png'] || '',
        bgUrl: uploadedUrls['laser-tag-bg-3.png'] || ''
      }
    },
    {
      sectionKey: 'lasertagSpecs',
      fields: {
        bgUrl: uploadedUrls['laser-tag-4.png'] || ''
      }
    },
    {
      sectionKey: 'lasertagSpace',
      fields: {
        mainImgUrl: uploadedUrls['laser-tag-5.png'] || ''
      }
    },
    {
      sectionKey: 'lasertagSpy',
      fields: {
        mainImgUrl: uploadedUrls['laser-tag-6.png'] || '',
        smallImgUrl: uploadedUrls['laser-tag-6-2.png'] || '',
        borderImgUrl: uploadedUrls['laser-tag-6-bg.png'] || '',
        buttonImgUrl: uploadedUrls['laser-tag-6-button.png'] || '',
        bgUrl: uploadedUrls['laser-tag-bg-3.png'] || ''
      }
    },
    {
      sectionKey: 'lasertagSpySpecs',
      fields: {
        bgUrl: uploadedUrls['laser-tag-4.png'] || ''
      }
    }
  ];

  for (const { sectionKey, fields } of sectionUpdates) {
    let doc = await Content.findOne({ sectionKey });
    if (doc) {
      doc.data = { ...(doc.data || {}), ...fields };
      doc.markModified('data');
      await doc.save();
      console.log(`Updated Mongo doc for '${sectionKey}'`);
    } else {
      console.log(`Doc '${sectionKey}' not yet in Mongo, skipping direct doc update (it will take default or admin save).`);
    }
  }

  console.log('\n--- Step 3: Summary of Uploaded Cloudinary URLs ---');
  console.log(JSON.stringify(uploadedUrls, null, 2));

  await mongoose.disconnect();
  console.log('\nCompleted successfully!');
  process.exit(0);
}

uploadAndSync().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

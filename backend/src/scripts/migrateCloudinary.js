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
 
async function migrate() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoURI);
  console.log('Connected to MongoDB.');
 
  const uploadsDir = path.resolve('uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log('No uploads directory found.');
    process.exit(0);
  }

  const files = fs.readdirSync(uploadsDir);
  console.log(`Found ${files.length} local files in ${uploadsDir}`);

  const urlMapping = {};

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const filePath = path.join(uploadsDir, filename);

    // Skip directories if any
    if (fs.statSync(filePath).isDirectory()) continue;

    console.log(`[${i + 1}/${files.length}] Uploading ${filename} to Cloudinary...`);
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'winera_uploads',
        resource_type: filename.endsWith('.pdf') ? 'raw' : 'auto'
      });
      urlMapping[filename] = res.secure_url;
      console.log(`  -> Uploaded: ${res.secure_url}`);
    } catch (err) {
      console.error(`  -> Failed to upload ${filename}:`, err.message);
    }
  }

  console.log('\nUpdating MongoDB documents with Cloudinary URLs...');
  const allContent = await Content.find({});
  let totalReplacements = 0;

  for (const doc of allContent) {
    let docString = JSON.stringify(doc.data);
    let modified = false;

    for (const [filename, cloudinaryUrl] of Object.entries(urlMapping)) {
      // Replace variations of local URLs
      const targetRegex = new RegExp(`(https?:\\/\\/[^"'/]+)?\\/uploads\\/${filename}`, 'g');
      if (targetRegex.test(docString)) {
        docString = docString.replace(targetRegex, cloudinaryUrl);
        modified = true;
        totalReplacements++;
      }
    }

    if (modified) {
      doc.data = JSON.parse(docString);
      doc.markModified('data');
      await doc.save();
      console.log(`  Updated section: ${doc.sectionKey}`);
    }
  }

  console.log(`\nMigration completed successfully! Total database links updated: ${totalReplacements}`);
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});

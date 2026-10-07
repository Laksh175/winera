import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import Blog from '../models/Blog.js';
import Content from '../models/Content.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
const blogsAssetsDir = path.resolve(__dirname, '../../../frontend/src/assets/blogs');
const commonAssetsDir = path.resolve(__dirname, '../../../frontend/src/assets');

async function uploadBlogs() {
  console.log('--- Step 1: Uploading All 28 Blog Images to Cloudinary ---');
  
  const uploadedMap = {};

  // Upload blog-cover-1.png through blog-cover-28.png
  for (let i = 1; i <= 28; i++) {
    const filename = `blog-cover-${i}.png`;
    const filePath = path.join(blogsAssetsDir, filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      continue;
    }

    console.log(`📤 Uploading ${filename} to Cloudinary...`);
    try {
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'winera_uploads/blogs',
        public_id: `blog-cover-${i}`,
        overwrite: true,
        transformation: [{ quality: 'auto', fetch_format: 'auto' }]
      });

      let optUrl = res.secure_url;
      if (optUrl && optUrl.includes('/upload/') && !optUrl.includes('/f_auto,q_auto/')) {
        optUrl = optUrl.replace('/upload/', '/upload/f_auto,q_auto/');
      }
      uploadedMap[filename] = optUrl;
      console.log(`✅ Uploaded ${filename} -> ${optUrl}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${filename}:`, err?.message || err);
    }
  }

  // Also upload blog-hero-bg.webp & blog-images.webp
  const otherFiles = ['blog-hero-bg.webp', 'blog-images.webp', 'blog-image-bg.webp'];
  for (const f of otherFiles) {
    const p = path.join(commonAssetsDir, f);
    if (fs.existsSync(p)) {
      try {
        const res = await cloudinary.uploader.upload(p, {
          folder: 'winera_uploads/blogs',
          public_id: f.replace(/\.[^/.]+$/, ''),
          overwrite: true,
          transformation: [{ quality: 'auto', fetch_format: 'auto' }]
        });
        let optUrl = res.secure_url;
        if (optUrl && optUrl.includes('/upload/') && !optUrl.includes('/f_auto,q_auto/')) {
          optUrl = optUrl.replace('/upload/', '/upload/f_auto,q_auto/');
        }
        uploadedMap[f] = optUrl;
        console.log(`✅ Uploaded ${f} -> ${optUrl}`);
      } catch (err) {
        console.error(`❌ Failed to upload ${f}:`, err?.message || err);
      }
    }
  }

  // --- Step 2: Update blogsData.json ---
  console.log('\n--- Step 2: Updating blogsData.json with Cloudinary URLs ---');
  const jsonPath = path.resolve(__dirname, '../data/blogsData.json');
  if (fs.existsSync(jsonPath)) {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    const blogs = JSON.parse(raw);

    const updatedBlogs = blogs.map((b) => {
      const coverName = `blog-cover-${b.id}.png`;
      if (uploadedMap[coverName]) {
        return {
          ...b,
          image: uploadedMap[coverName],
          imageUrl: uploadedMap[coverName]
        };
      }
      return b;
    });

    fs.writeFileSync(jsonPath, JSON.stringify(updatedBlogs, null, 2), 'utf8');
    console.log(`✅ Updated ${updatedBlogs.length} entries in blogsData.json`);
  }

  // --- Step 3: Update frontend/src/data/blogData.js ---
  console.log('\n--- Step 3: Updating frontend/src/data/blogData.js with Cloudinary URLs ---');
  const blogDataJsPath = path.resolve(__dirname, '../../../frontend/src/data/blogData.js');
  if (fs.existsSync(blogDataJsPath)) {
    let jsContent = fs.readFileSync(blogDataJsPath, 'utf8');
    for (let i = 1; i <= 28; i++) {
      const coverName = `blog-cover-${i}.png`;
      if (uploadedMap[coverName]) {
        // replace image: blogImgX or image: "..." with the Cloudinary URL
        const regex = new RegExp(`image:\\s*(blogImg${i}|['"][^'"]*['"])`, 'g');
        jsContent = jsContent.replace(regex, `image: "${uploadedMap[coverName]}"`);
      }
    }
    fs.writeFileSync(blogDataJsPath, jsContent, 'utf8');
    console.log('✅ Updated frontend/src/data/blogData.js');
  }

  // --- Step 4: Sync to MongoDB Blog & Content Collections ---
  console.log('\n--- Step 4: Syncing to MongoDB Database ---');
  await mongoose.connect(mongoURI);
  console.log('✅ MongoDB connected');

  const rawJson = fs.readFileSync(jsonPath, 'utf8');
  const finalBlogs = JSON.parse(rawJson);

  // 1. Update Blog Collection
  await Blog.deleteMany({});
  await Blog.insertMany(finalBlogs);
  console.log(`✅ Inserted ${finalBlogs.length} blogs into MongoDB 'Blog' collection`);

  // 2. Update Content Collection
  await Content.findOneAndUpdate(
    { sectionKey: 'blogPosts' },
    {
      sectionKey: 'blogPosts',
      data: {
        posts: finalBlogs
      }
    },
    { upsert: true, new: true }
  );
  console.log(`✅ Updated MongoDB Content collection ('blogPosts') with Cloudinary URLs`);

  await mongoose.disconnect();
  console.log('\n🎉 ALL 28 BLOG IMAGES ARE NOW 100% HOSTED ON CLOUDINARY & SYNCED IN MONGODB!');
}

uploadBlogs().catch((e) => {
  console.error('Fatal Error:', e);
  process.exit(1);
});

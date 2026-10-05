import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import Blog from '../models/Blog.js';
import Content from '../models/Content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedBlogs = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    console.log('🔄 Connecting to MongoDB at:', mongoUri.replace(/:[^:]*@/, ':****@'));
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected successfully!');

    // Read blogsData.json
    const jsonPath = path.join(__dirname, '../data/blogsData.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Data file not found at: ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const blogs = JSON.parse(rawData);

    console.log(`📦 Found ${blogs.length} blog posts to insert.`);

    // 1. Insert into dedicated 'Blog' collection using insertMany
    console.log('🗑️  Clearing existing Blog collection...');
    await Blog.deleteMany({});

    console.log(`🚀 Inserting ${blogs.length} blogs into MongoDB using insertMany...`);
    const insertedBlogs = await Blog.insertMany(blogs, { ordered: false });
    console.log(`✅ Successfully inserted ${insertedBlogs.length} documents into 'Blog' collection!`);

    // 2. Also update Content Collection (blogPosts section)
    console.log('🔄 Updating Content model (blogPosts section)...');
    await Content.findOneAndUpdate(
      { sectionKey: 'blogPosts' },
      {
        sectionKey: 'blogPosts',
        data: {
          posts: blogs
        }
      },
      { upsert: true, new: true }
    );
    console.log('✅ Content collection (blogPosts) updated with 28 blogs!');

    console.log('\n📚 Blog Posts Seeded into MongoDB:');
    blogs.forEach((b, idx) => {
      console.log(`   ${idx + 1}. [${b.category}] ${b.title} ${b.subtitle}`);
    });

    console.log('\n🎉 All Blog posts are now fully managed and stored in MongoDB!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blogs to MongoDB:', error);
    process.exit(1);
  }
};

seedBlogs();

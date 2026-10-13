import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Content from '../models/Content.js';
import Project from '../models/Project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../.env') });

const LIVE_CONTENT_URL = 'https://winera-backend.onrender.com/api/content';

async function syncLiveProjectImages() {
  try {
    console.log('🔄 Fetching live content from:', LIVE_CONTENT_URL);
    const response = await fetch(LIVE_CONTENT_URL);
    const liveData = await response.json();

    const liveBuiltProjects = liveData.builtProjects || [];
    const liveProjectItems = liveData.projectItems || [];
    const liveProjectCategories = liveData.projectCategories || [];

    console.log(`✅ Live data fetched: ${liveBuiltProjects.length} builtProjects, ${liveProjectItems.length} projectItems`);

    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);

    // 1. Update Content collection in MongoDB section by section
    const sectionsToSync = [
      'builtProjects',
      'projectItems',
      'projectCategories',
      'projectHero',
      'projectBlock',
      'projectClientWanted',
      'projectSolution',
      'projectGallery',
      'projectVideo',
      'projectCta',
      'projectSeo'
    ];

    for (const key of sectionsToSync) {
      if (liveData[key] !== undefined) {
        await Content.findOneAndUpdate(
          { sectionKey: key },
          { sectionKey: key, data: liveData[key] },
          { upsert: true, new: true }
        );
        console.log(`✅ Synced Content section '${key}' to MongoDB`);
      }
    }

    // Map builtProjects image lookup (name/slug -> imageUrl)
    const builtImagesMap = {};
    liveBuiltProjects.forEach(bp => {
      const key = (bp.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (key && bp.imageUrl) {
        builtImagesMap[key] = bp.imageUrl;
      }
    });

    // Map projectItems image lookup (name/slug -> img)
    const itemImagesMap = {};
    liveProjectItems.forEach(item => {
      const slugKey = (item.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const nameKey = (item.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const idKey = (item.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (item.img) {
        if (slugKey) itemImagesMap[slugKey] = item.img;
        if (nameKey) itemImagesMap[nameKey] = item.img;
        if (idKey) itemImagesMap[idKey] = item.img;
      }
    });

    // 2. Update existing Project collection records with live images
    const existingProjects = await Project.find({});
    console.log(`Found ${existingProjects.length} existing projects in 'projects' collection`);

    for (const proj of existingProjects) {
      const cleanSlug = (proj.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanName = (proj.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanId = (proj.id || '').toLowerCase().replace(/[^a-z0-9]/g, '');

      // Check builtProjects priority first (high quality webp)
      const builtImg = builtImagesMap[cleanSlug] || builtImagesMap[cleanName] || builtImagesMap[cleanId];
      // Check projectItems next
      const itemImg = itemImagesMap[cleanSlug] || itemImagesMap[cleanName] || itemImagesMap[cleanId];

      const bestImg = builtImg || itemImg;

      if (bestImg && bestImg !== proj.img) {
        console.log(`📸 Updating ${proj.name} (${proj.slug}):\n   old: ${proj.img}\n   new: ${bestImg}`);
        proj.img = bestImg;
        if (!proj.clientImg || proj.clientImg.includes('/src/assets/')) {
          proj.clientImg = bestImg;
        }
        await proj.save();
      }
    }

    // 3. For any live projectItem not in Project collection, add it so all admin projects exist in Project collection too!
    for (const item of liveProjectItems) {
      const slug = item.slug || (item.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const exists = await Project.findOne({ slug });
      if (!exists) {
        console.log(`➕ Adding missing admin project: ${item.name} (${slug})`);
        await Project.create({
          id: item.id || slug,
          slug: slug,
          name: item.name,
          category: item.category || 'Game Zones',
          type: item.type || `${item.category || 'Game Zone'} Setup`,
          city: item.city || '',
          state: item.state || '',
          area: item.area || '',
          titleLine1: `${item.name}: A`,
          titleLine2: 'Complete ',
          titleLine2Black: `${item.category || 'Turnkey'} Setup`,
          titleLine3: `in ${item.city || 'India'}`,
          description: `Turnkey ${item.category || 'entertainment'} entertainment destination designed and executed by Winera International.`,
          clientWanted1: `The client required a complete, turnkey ${item.category || 'entertainment center'} solution in ${item.city || 'India'}.`,
          clientWanted2: 'They entrusted Winera International for end-to-end equipment supply, engineering, and installation.',
          clientImg: item.img,
          solution1: `We delivered ${item.name} as a complete, ready-to-open venue engineered for high guest throughput.`,
          solution2: 'Equipped with commercial-grade gaming machines and certified safety standards.',
          solutionImg: item.img,
          img: item.img,
          galleryImages: [item.img],
          metaTitle: item.metaTitle || `${item.name} | Winera International`,
          metaDescription: item.metaDescription || `Explore ${item.name} executed by Winera International.`,
          isActive: true,
          status: 'active'
        });
      }
    }

    // 4. Update local JSON backup files
    const allFinalProjects = await Project.find({ isActive: true }).lean();
    console.log(`Total projects in MongoDB now: ${allFinalProjects.length}`);

    const backendJsonPath = path.resolve(__dirname, '../data/projectsData.json');
    const frontendJsonPath = path.resolve(__dirname, '../../../frontend/src/data/projectsData.json');

    fs.writeFileSync(backendJsonPath, JSON.stringify(allFinalProjects, null, 2), 'utf-8');
    fs.writeFileSync(frontendJsonPath, JSON.stringify(allFinalProjects, null, 2), 'utf-8');
    console.log('✅ Updated backend and frontend projectsData.json');

    console.log('🎉 Live project images and documents successfully synced to MongoDB!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  }
}

syncLiveProjectImages();

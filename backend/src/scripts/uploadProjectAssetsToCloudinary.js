import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Content from '../models/Content.js';
import Project from '../models/Project.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'achfsmlm',
  api_key: process.env.CLOUDINARY_API_KEY || '753149659957868',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'eWxHZbi60csujh5_BpDln8qIQmA'
});

const projectsDir = path.resolve(__dirname, '../../../frontend/public/assets');

const projectsMapping = [
  {
    slug: 'fifthalley-sport-bowling',
    folder: 'FifthAlley-Sport-Bowling',
    mainImg: 'fifthalley-sport-bowling.jpg',
    basicInfoBg: 'basic-information.jpg',
    clientImg: 'what-the-client-wanted.jpg',
    solutionImg: 'what-solution-we-provide.jpg',
    gallery: [
      'gallery-1.jpg',
      'gallery-2.webp',
      'gallery-3.jpg',
      'gallery-4.jpg',
      'gallery-5.webp',
      'gallery-6.webp'
    ]
  },
  {
    slug: 'hulaboo',
    folder: 'Hulaboo ( Surat )',
    mainImg: '1st Image.jpg',
    basicInfoBg: 'Basic Information.jpg',
    clientImg: 'What the Client Wanted.jpg',
    solutionImg: 'What Solution We Provide.webp',
    gallery: [
      'Gallery 1.jpg',
      'Gallery 2.webp',
      'Gallery 3.jpg',
      'Gallery 4.jpg',
      'Gallery 5.jpg',
      'Gallery 6.jpg'
    ]
  },
  {
    slug: 'lanex-bowling-alley',
    folder: 'LaneX Bowling Alley ( Surat )',
    mainImg: '1st Image.jpg',
    basicInfoBg: 'Basic Information.jpg',
    clientImg: 'What the Client Wanted.jpg',
    solutionImg: 'What Solution We Provide.webp',
    gallery: [
      'Gallery 1.jpg',
      'Gallery  2.webp',
      'Gallery  3.webp',
      'Gallery 4.webp',
      'Gallery 5.webp',
      'Gallery 6.webp'
    ]
  },
  {
    slug: 'playzonia',
    folder: 'Playzonia Kids Play Area ( Surat )',
    mainImg: '1st Image.jpg',
    basicInfoBg: 'Basic Information.jpg',
    clientImg: 'What the Client Wanted.jpg',
    solutionImg: 'What Solution We Provide.jpg',
    gallery: [
      'Gallery 1.jpg',
      'Gallery  2.jpg',
      'Gallery  3.jpg',
      'Gallery  4.jpg',
      'Gallery 5.jpg',
      'Gallery  6.jpg'
    ]
  },
  {
    slug: 'rebounce',
    folder: 'Rebounce Game Zone ( Surat )',
    mainImg: '1st Image.jpg',
    basicInfoBg: 'Basic Information.jpg',
    clientImg: 'What the Client Wanted.jpg',
    solutionImg: 'What Solution We Provide.jpg',
    gallery: [
      'Gallery 1.jpg',
      'Gallery 2.jpg',
      'Gallery 3.jpg',
      'Gallery 4.jpg',
      'Gallery 5.jpg',
      'Gallery 6.webp'
    ]
  },
  {
    slug: 'rock-and-bowl',
    folder: 'Rock And Bowl ( Vapi )',
    mainImg: '1st Image.jpg',
    basicInfoBg: 'Basic Information.jpg',
    clientImg: 'What the Client Wanted.webp',
    solutionImg: 'What Solution We Provide.jpg',
    gallery: [
      'Gallery 1.jpg',
      'Gallery 2.webp',
      'Galley 3.jpg',
      'Gallery 4.jpg',
      'Gallery 5.jpg',
      'Gallery 6.webp',
      'galley 7.jpg'
    ]
  },
  {
    slug: 'level-up',
    folder: 'Level Up ( Morbi )',
    mainImg: '1st Image.jpg',
    basicInfoBg: 'Basic Information.jpg',
    clientImg: 'What the Client Wanted.jpg',
    solutionImg: 'What Solution We Provide.webp',
    gallery: [
      'gallery 1.jpg',
      'Gallery 2.jpg',
      'Gallery 3.webp',
      'Gallery 4.webp',
      'Gallery 5.webp',
      'Gallery 6.webp'
    ]
  }
];

async function uploadFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn('File not found:', filePath);
    return null;
  }
  const res = await cloudinary.uploader.upload(filePath, {
    folder: 'winera_uploads/projects',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }]
  });
  let optUrl = res.secure_url;
  if (optUrl && optUrl.includes('/upload/') && !optUrl.includes('/f_auto,q_auto/')) {
    optUrl = optUrl.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return optUrl;
}

async function run() {
  console.log('Connecting to database...');
  await connectDB();

  const uploadedMap = {};

  for (const proj of projectsMapping) {
    console.log(`\n=== Uploading assets for: ${proj.slug} (${proj.folder}) ===`);
    const folderPath = path.join(projectsDir, proj.folder);
    uploadedMap[proj.slug] = {};

    // 1. mainImg
    const mainPath = path.join(folderPath, proj.mainImg);
    console.log(`Uploading Main Image: ${proj.mainImg}`);
    uploadedMap[proj.slug].img = await uploadFile(mainPath);

    // 2. basicInfoBg
    const basicPath = path.join(folderPath, proj.basicInfoBg);
    console.log(`Uploading Basic Info BG: ${proj.basicInfoBg}`);
    uploadedMap[proj.slug].basicInfoBg = await uploadFile(basicPath);

    // 3. clientImg
    const clientPath = path.join(folderPath, proj.clientImg);
    console.log(`Uploading Client Img: ${proj.clientImg}`);
    uploadedMap[proj.slug].clientImg = await uploadFile(clientPath);

    // 4. solutionImg
    const solutionPath = path.join(folderPath, proj.solutionImg);
    console.log(`Uploading Solution Img: ${proj.solutionImg}`);
    uploadedMap[proj.slug].solutionImg = await uploadFile(solutionPath);

    // 5. Gallery
    uploadedMap[proj.slug].galleryImages = [];
    for (let i = 0; i < proj.gallery.length; i++) {
      const gFilename = proj.gallery[i];
      const gPath = path.join(folderPath, gFilename);
      console.log(`Uploading Gallery ${i + 1}: ${gFilename}`);
      const gUrl = await uploadFile(gPath);
      if (gUrl) {
        uploadedMap[proj.slug].galleryImages.push(gUrl);
        uploadedMap[proj.slug][`galleryImage${i + 1}`] = gUrl;
      }
    }
  }

  // Update backend projectsData.json
  const backendJsonPath = path.resolve(__dirname, '../data/projectsData.json');
  const frontendJsonPath = path.resolve(__dirname, '../../../frontend/src/data/projectsData.json');

  const backendData = JSON.parse(fs.readFileSync(backendJsonPath, 'utf-8'));
  const updatedBackendData = backendData.map(p => {
    const uploaded = uploadedMap[p.slug];
    if (uploaded) {
      return {
        ...p,
        img: uploaded.img || p.img,
        imageUrl: uploaded.img || p.imageUrl || p.img,
        basicInfoBg: uploaded.basicInfoBg || p.basicInfoBg,
        clientImg: uploaded.clientImg || p.clientImg,
        solutionImg: uploaded.solutionImg || p.solutionImg,
        galleryImages: (uploaded.galleryImages && uploaded.galleryImages.length > 0) ? uploaded.galleryImages : p.galleryImages,
        galleryImage1: uploaded.galleryImage1 || p.galleryImage1,
        galleryImage2: uploaded.galleryImage2 || p.galleryImage2,
        galleryImage3: uploaded.galleryImage3 || p.galleryImage3,
        galleryImage4: uploaded.galleryImage4 || p.galleryImage4,
        galleryImage5: uploaded.galleryImage5 || p.galleryImage5,
        galleryImage6: uploaded.galleryImage6 || p.galleryImage6
      };
    }
    return p;
  });

  fs.writeFileSync(backendJsonPath, JSON.stringify(updatedBackendData, null, 2), 'utf-8');
  fs.writeFileSync(frontendJsonPath, JSON.stringify(updatedBackendData, null, 2), 'utf-8');
  console.log('\nUpdated backend & frontend projectsData.json with Cloudinary URLs!');

  // Update MongoDB Content.projectItems
  const contentDoc = await Content.findOne({ sectionKey: 'projectItems' });
  if (contentDoc && Array.isArray(contentDoc.data)) {
    contentDoc.data = contentDoc.data.map(p => {
      const uploaded = uploadedMap[p.slug];
      if (uploaded) {
        return {
          ...p,
          img: uploaded.img || p.img,
          imageUrl: uploaded.img || p.imageUrl || p.img,
          basicInfoBg: uploaded.basicInfoBg || p.basicInfoBg,
          clientImg: uploaded.clientImg || p.clientImg,
          solutionImg: uploaded.solutionImg || p.solutionImg,
          galleryImages: (uploaded.galleryImages && uploaded.galleryImages.length > 0) ? uploaded.galleryImages : p.galleryImages,
          galleryImage1: uploaded.galleryImage1 || p.galleryImage1,
          galleryImage2: uploaded.galleryImage2 || p.galleryImage2,
          galleryImage3: uploaded.galleryImage3 || p.galleryImage3,
          galleryImage4: uploaded.galleryImage4 || p.galleryImage4,
          galleryImage5: uploaded.galleryImage5 || p.galleryImage5,
          galleryImage6: uploaded.galleryImage6 || p.galleryImage6
        };
      }
      return p;
    });
    contentDoc.markModified('data');
    await contentDoc.save();
    console.log('Updated MongoDB Content.projectItems successfully!');
  }

  // Update MongoDB Project collection
  for (const [slug, uploaded] of Object.entries(uploadedMap)) {
    const existing = await Project.findOne({ slug });
    if (existing) {
      await Project.findOneAndUpdate(
        { slug },
        {
          $set: {
            img: uploaded.img || existing.img,
            imageUrl: uploaded.img || existing.imageUrl || existing.img,
            basicInfoBg: uploaded.basicInfoBg || existing.basicInfoBg,
            clientImg: uploaded.clientImg || existing.clientImg,
            solutionImg: uploaded.solutionImg || existing.solutionImg,
            galleryImages: (uploaded.galleryImages && uploaded.galleryImages.length > 0) ? uploaded.galleryImages : existing.galleryImages,
            galleryImage1: uploaded.galleryImage1 || existing.galleryImage1,
            galleryImage2: uploaded.galleryImage2 || existing.galleryImage2,
            galleryImage3: uploaded.galleryImage3 || existing.galleryImage3,
            galleryImage4: uploaded.galleryImage4 || existing.galleryImage4,
            galleryImage5: uploaded.galleryImage5 || existing.galleryImage5,
            galleryImage6: uploaded.galleryImage6 || existing.galleryImage6
          }
        }
      );
      console.log(`Updated Project collection for: ${slug}`);
    }
  }

  console.log('\nALL 5 PROJECTS SUCCESSFULLY UPLOADED TO CLOUDINARY & MONGO UPDATED!');
  process.exit(0);
}

run().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const assetsDir = path.resolve(__dirname, '../../../frontend/src/assets');
const mapFilePath = path.resolve(__dirname, 'cloudinaryAssetsMap.json');

let existingMap = {};
if (fs.existsSync(mapFilePath)) {
  try {
    existingMap = JSON.parse(fs.readFileSync(mapFilePath, 'utf-8'));
  } catch (e) {
    existingMap = {};
  }
}

async function uploadSingleFile(filename) {
  if (existingMap[filename]) return;
  const filePath = path.join(assetsDir, filename);

  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: 'winera_uploads',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }]
    });

    let optUrl = res.secure_url;
    if (optUrl && optUrl.includes('/upload/') && !optUrl.includes('/f_auto,q_auto/')) {
      optUrl = optUrl.replace('/upload/', '/upload/f_auto,q_auto/');
    }

    existingMap[filename] = optUrl;
    console.log(`✓ ${filename} -> ${optUrl}`);
    fs.writeFileSync(mapFilePath, JSON.stringify(existingMap, null, 2));
  } catch (err) {
    console.error(`✗ Failed ${filename}:`, err.message);
  }
}

async function uploadAll() {
  console.log('--- Scanning frontend/src/assets directory ---');
  const files = fs.readdirSync(assetsDir);
  const imageExtensions = ['.webp', '.png', '.jpg', '.jpeg', '.svg'];

  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });

  const pendingFiles = imageFiles.filter(f => !existingMap[f]);
  console.log(`Total images: ${imageFiles.length}, Already uploaded: ${imageFiles.length - pendingFiles.length}, Pending: ${pendingFiles.length}`);

  const CONCURRENCY = 10;
  for (let i = 0; i < pendingFiles.length; i += CONCURRENCY) {
    const batch = pendingFiles.slice(i, i + CONCURRENCY);
    console.log(`Uploading batch ${Math.floor(i / CONCURRENCY) + 1}/${Math.ceil(pendingFiles.length / CONCURRENCY)} (${batch.length} files)...`);
    await Promise.all(batch.map(file => uploadSingleFile(file)));
  }

  console.log(`\n--- Completed all uploads! Total mapped: ${Object.keys(existingMap).length} ---`);
  fs.writeFileSync(mapFilePath, JSON.stringify(existingMap, null, 2));
  process.exit(0);
}

uploadAll().catch(err => {
  console.error('Fatal upload error:', err);
  process.exit(1);
});

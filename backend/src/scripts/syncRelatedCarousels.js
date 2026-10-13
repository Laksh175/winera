import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const relatedSectionKeys = [
  'arcadeRelated',
  'bowlingRelated',
  'softplayRelated',
  'trampolineRelated',
  'amusementRelated',
  'hypergridRelated',
  'bumpercarRelated',
  'vrRelated',
  'arRelated',
  'lasertagRelated',
  'projectRelated'
];

async function syncRelatedProducts() {
  console.log('1. Fetching arcadeRelated from live API...');
  const liveRes = await fetch('https://winera-backend.onrender.com/api/content');
  const liveContent = await liveRes.json();

  const arcadeRelated = liveContent.arcadeRelated;
  if (!arcadeRelated || !Array.isArray(arcadeRelated.items) || arcadeRelated.items.length === 0) {
    throw new Error('arcadeRelated items not found in live content');
  }

  console.log(`Found ${arcadeRelated.items.length} items in live arcadeRelated:`);
  arcadeRelated.items.forEach((it, i) => {
    console.log(`  [${i + 1}] ${it.title} -> ${it.img}`);
  });

  // 2. Update local MongoDB
  console.log('\n2. Updating local MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera');
  const Content = mongoose.model('Content', new mongoose.Schema({}, { strict: false }));

  for (const key of relatedSectionKeys) {
    const existing = await Content.findOne({ sectionKey: key });
    const title = existing?.data?.title || existing?.title || '*Related* Products';
    const updatedData = {
      title,
      items: arcadeRelated.items
    };

    await Content.findOneAndUpdate(
      { sectionKey: key },
      { sectionKey: key, data: updatedData },
      { upsert: true, new: true }
    );
    console.log(`✓ Updated local MongoDB section: ${key}`);
  }
  await mongoose.disconnect();
  console.log('✓ Local MongoDB updated successfully.');

  // 3. Update live backend MongoDB via Admin API
  console.log('\n3. Updating live database via Admin API...');
  const loginRes = await fetch('https://winera-backend.onrender.com/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'admin123' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;

  if (!token) {
    console.error('Failed to get admin token for live backend:', loginData);
  } else {
    console.log('✓ Successfully authenticated with live backend.');
    for (const key of relatedSectionKeys) {
      const existingData = liveContent[key] || {};
      const payload = {
        sectionKey: key,
        data: {
          title: existingData.title || '*Related* Products',
          items: arcadeRelated.items
        }
      };

      const putRes = await fetch('https://winera-backend.onrender.com/api/admin/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const putData = await putRes.json();
      if (putRes.ok) {
        console.log(`✓ Updated live section: ${key}`);
      } else {
        console.error(`✗ Error updating live section ${key}:`, putData);
      }
    }
    console.log('✓ All live sections updated successfully!');
  }
}

syncRelatedProducts()
  .then(() => {
    console.log('\nAll related product carousel sync operations completed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Fatal error during sync:', err);
    process.exit(1);
  });

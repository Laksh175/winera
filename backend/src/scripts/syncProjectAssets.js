import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs';
import Content from '../models/Content.js';
import Project from '../models/Project.js';
import connectDB from '../config/db.js';

async function syncProjects() {
  await connectDB();
  const projectsData = JSON.parse(fs.readFileSync(new URL('../data/projectsData.json', import.meta.url), 'utf-8'));
  
  const doc = await Content.findOne({ sectionKey: 'projectItems' });
  if (doc && Array.isArray(doc.data)) {
    const keysToUpdate = ['lanex-bowling-alley', 'playzonia', 'rebounce'];
    let modified = false;
    doc.data = doc.data.map(p => {
      if (keysToUpdate.includes(p.slug) || keysToUpdate.includes(p.id)) {
        const fresh = projectsData.find(fp => fp.slug === p.slug || fp.id === p.id);
        if (fresh) {
          modified = true;
          return { ...p, ...fresh };
        }
      }
      return p;
    });
    if (modified) {
      doc.markModified('data');
      await doc.save();
      console.log('Successfully updated Content.projectItems in MongoDB!');
    }
  }

  for (const slug of ['lanex-bowling-alley', 'playzonia', 'rebounce']) {
    const fresh = projectsData.find(fp => fp.slug === slug || fp.id === slug);
    if (fresh) {
      await Project.findOneAndUpdate(
        { $or: [{ slug }, { id: slug }] },
        { $set: fresh },
        { upsert: true }
      );
      console.log('Successfully updated Project model for:', slug);
    }
  }

  console.log('Sync complete!');
  process.exit(0);
}

syncProjects().catch(err => {
  console.error(err);
  process.exit(1);
});

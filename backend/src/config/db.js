import mongoose from 'mongoose';
import ArcadeProduct from '../models/ArcadeProduct.js';
import Content from '../models/Content.js';

export const cleanJunkProductsFromDb = async () => {
  try {
    const delRes = await ArcadeProduct.deleteMany({
      $or: [
        { slug: { $in: ['to', 'to-2', 'to-3', 'example'] } },
        { slug: { $regex: /^invoice-wi/i } }
      ]
    });
    if (delRes.deletedCount > 0) {
      console.log(`[DB Clean] Removed ${delRes.deletedCount} junk test products from ArcadeProduct collection.`);
    }

    const contentDocs = await Content.find({ sectionKey: { $in: ['arcadeCategories', 'vrCategories', 'vrRange'] } });
    for (const doc of contentDocs) {
      if (doc.data && Array.isArray(doc.data.cards)) {
        const origLen = doc.data.cards.length;
        doc.data.cards = doc.data.cards.filter(c => {
          const s = (c.slug || c.name || '').toLowerCase();
          if (/^to(-\d+)?$/i.test(s) || /invoice-wi/i.test(s) || s === 'example') {
            return false;
          }
          return true;
        });
        if (doc.data.cards.length !== origLen) {
          doc.markModified('data');
          await doc.save();
          console.log(`[DB Clean] Cleaned ${origLen - doc.data.cards.length} junk cards from Content.`);
        }
      }
    }
  } catch (err) {
    console.warn('[DB Clean Error]:', err.message);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await cleanJunkProductsFromDb();
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Retrying MongoDB Connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;

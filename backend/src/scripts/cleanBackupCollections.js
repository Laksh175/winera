import 'dotenv/config';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const cleanBackupCollectionsFromLive = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    await mongoose.connect(mongoUri);

    const client = mongoose.connection.client;
    const liveDbName = process.env.MONGODB_SOURCE_DB_NAME || 'myappdb';
    const liveDb = client.db(liveDbName);

    const collections = await liveDb.listCollections().toArray();
    const backupCols = collections.filter(c => c.name.startsWith('_backup_'));

    if (backupCols.length === 0) {
      console.log(`ℹ️ [Cleanup] No "_backup_*" collections found in live database "${liveDbName}". It is already 100% clean.`);
    } else {
      console.log(`🧹 [Cleanup] Found ${backupCols.length} backup collections inside live database "${liveDbName}" to remove:`);
      for (const col of backupCols) {
        await liveDb.collection(col.name).drop();
        console.log(`  ✓ Removed "${col.name}" from "${liveDbName}"`);
      }
      console.log(`✅ [Cleanup] Live database "${liveDbName}" is now 100% pure and clean!`);
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ [Cleanup Error]:', err.message);
    process.exit(1);
  }
};

cleanBackupCollectionsFromLive();

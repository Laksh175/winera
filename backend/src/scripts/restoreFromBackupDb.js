import 'dotenv/config';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

/**
 * Restores all collections from 'winera-backup' database back into the live database.
 */
const restoreFromBackupDb = async () => {
  const startTime = Date.now();
  console.log('\n======================================================');
  console.log('🔄 [DB Restore] Starting restore from "winera-backup" into Live DB...');
  console.log('======================================================');

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/winera';
    console.log('🔄 Connecting to MongoDB at:', mongoUri.replace(/:[^:]*@/, ':****@'));
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB.');

    const client = mongoose.connection.client;
    const connectedDb = mongoose.connection.db;

    // Detect available databases on MongoDB
    let availableDbNames = [];
    try {
      const adminDb = client.db().admin();
      const dbsList = await adminDb.listDatabases();
      availableDbNames = (dbsList?.databases || []).map(d => d.name);
    } catch {
      // Non-fatal if unprivileged user
    }

    // Determine Live Target Database for restore:
    let liveDbName = process.env.MONGODB_SOURCE_DB_NAME;
    if (!liveDbName) {
      if (availableDbNames.includes('myappdb')) {
        liveDbName = 'myappdb';
      } else {
        liveDbName = connectedDb.databaseName;
      }
    }

    const liveDb = client.db(liveDbName);
    const backupDbName = process.env.MONGODB_BACKUP_DB_NAME || `${liveDbName}-backup`;

    if (liveDbName === backupDbName) {
      throw new Error(`CRITICAL ERROR: Live DB (${liveDbName}) and Backup DB (${backupDbName}) are the same! Aborting.`);
    }

    let sourceBackupDb = null;
    let isPrefixedSource = false;
    let backupCollections = [];

    // 1. Try reading from separate backup database
    try {
      const candidateDb = client.db(backupDbName);
      const cols = await candidateDb.listCollections().toArray();
      if (cols && cols.length > 0) {
        sourceBackupDb = candidateDb;
        backupCollections = cols.filter(c => !c.name.startsWith('system.'));
      }
    } catch {
      // Unauthorized on separate db
    }

    // 2. Fallback to _backup_ collections inside live database
    if (backupCollections.length === 0) {
      const liveCols = await liveDb.listCollections().toArray();
      const backupColsInLive = liveCols.filter(c => c.name.startsWith('_backup_'));
      if (backupColsInLive.length > 0) {
        sourceBackupDb = liveDb;
        isPrefixedSource = true;
        backupCollections = backupColsInLive;
        console.log(`💡 [DB Restore] Found internal backup collections ("_backup_<name>") inside "${liveDbName}".`);
      }
    }

    if (backupCollections.length === 0) {
      console.warn(`⚠️ [DB Restore] No backup collections found in "${backupDbName}" or "${liveDbName}._backup_*". Restore cancelled.`);
      process.exit(1);
    }

    console.log(`ℹ️ [DB Restore] Found ${backupCollections.length} backup collections to restore into "${liveDbName}".`);

    let totalDocsRestored = 0;

    for (const colInfo of backupCollections) {
      const rawName = colInfo.name;
      if (rawName.startsWith('system.')) continue;

      const targetLiveColName = isPrefixedSource ? rawName.replace(/^_backup_/, '') : rawName;
      const backupCol = sourceBackupDb.collection(rawName);
      const docs = await backupCol.find({}).toArray();

      const liveCol = liveDb.collection(targetLiveColName);

      // CRITICAL DATA PROTECTION: NEVER drop 'leads' collection during a restore!
      // Leads are real-time customer inquiries and must never be wiped out.
      if (targetLiveColName === 'leads') {
        if (docs.length > 0) {
          for (const leadDoc of docs) {
            await liveCol.updateOne(
              { _id: leadDoc._id },
              { $setOnInsert: leadDoc },
              { upsert: true }
            );
          }
        }
        totalDocsRestored += docs.length;
        console.log(`  🛡️ [Protected] Merged "${targetLiveColName}": ${docs.length} documents safely without dropping live leads.`);
        continue;
      }

      // Drop current state of live collection to replace with backup
      try {
        await liveCol.drop();
      } catch (dropErr) {
        if (dropErr.code !== 26 && !dropErr.message?.includes('ns not found')) {
          console.warn(`[DB Restore] Notice dropping ${colName}:`, dropErr.message);
        }
      }

      if (docs.length > 0) {
        await liveCol.insertMany(docs, { ordered: false });
      }

      // Restore indexes
      try {
        const indexes = await backupCol.indexes();
        const customIndexes = indexes.filter(idx => idx.name !== '_id_');
        for (const idx of customIndexes) {
          const { key, ...opts } = idx;
          await liveCol.createIndex(key, opts).catch(() => {});
        }
      } catch {
        // Non-fatal
      }

      totalDocsRestored += docs.length;
      console.log(`  ✓ Restored "${colName}": ${docs.length} documents -> "${liveDbName}.${colName}"`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('------------------------------------------------------');
    console.log(`✅ [DB Restore] Restore completed successfully in ${duration}s!`);
    console.log(`📦 [DB Restore] Total ${totalDocsRestored} documents restored into Live DB "${liveDbName}".`);
    console.log('======================================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ [DB Restore] Error during restore process:', error);
    process.exit(1);
  }
};

restoreFromBackupDb();

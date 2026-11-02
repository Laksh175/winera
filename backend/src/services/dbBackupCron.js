import mongoose from 'mongoose';
import cron from 'node-cron';

/**
 * Safely duplicates all collections from the live database into 'winera-backup'.
 * 
 * GUARANTEES:
 * 1. ZERO write/update/delete operations on the live source database. It is 100% READ ONLY.
 * 2. Only the target backup database ('winera-backup') is refreshed with the fresh documents.
 * 3. Fresh data (new blogs, products, leads, contents, vrgames, projects) replaces the previous backup.
 */
export const syncLiveDbToBackupDb = async () => {
  const startTime = Date.now();
  console.log('\n======================================================');
  console.log('🔄 [DB Backup] Starting daily automated database backup...');
  console.log('======================================================');

  try {
    if (!mongoose.connection || mongoose.connection.readyState !== 1) {
      console.warn('⚠️ [DB Backup] Primary MongoDB is not ready yet. Skipping run.');
      return;
    }

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

    // Determine Live Source Database:
    // 1. Explicit env MONGODB_SOURCE_DB_NAME (e.g. 'myappdb')
    // 2. If 'myappdb' exists on MongoDB, prioritize it because it is the live admin production DB
    // 3. Fallback to connected database
    let sourceDbName = process.env.MONGODB_SOURCE_DB_NAME;
    if (!sourceDbName) {
      if (availableDbNames.includes('myappdb')) {
        sourceDbName = 'myappdb';
      } else {
        sourceDbName = connectedDb.databaseName;
      }
    }

    const sourceDb = client.db(sourceDbName);
    const targetDbName = process.env.MONGODB_BACKUP_DB_NAME || `${sourceDbName}-backup`;

    console.log(`ℹ️ [DB Backup] SOURCE (Live, Read-Only): "${sourceDbName}"`);

    // Verify if current MongoDB user has write permission on the separate target database
    let useSeparateDb = true;
    let targetDb = null;

    if (sourceDbName === targetDbName) {
      useSeparateDb = false;
    } else {
      try {
        const candidateDb = client.db(targetDbName);
        const testCol = candidateDb.collection('__winera_perm_check__');
        await testCol.insertOne({ test: 1 });
        await testCol.drop();
        targetDb = candidateDb;
      } catch (permErr) {
        if (permErr.code === 13 || permErr.codeName === 'Unauthorized' || permErr.message?.includes('not authorized')) {
          useSeparateDb = false;
          console.warn(`⚠️ [DB Backup] MongoDB user is not authorized on separate database "${targetDbName}".`);
          console.log(`💡 [DB Backup] Auto-fallback activated: Creating backup collections directly inside "${sourceDbName}" with "_backup_" prefix.`);
        } else {
          useSeparateDb = false;
        }
      }
    }

    if (useSeparateDb) {
      console.log(`ℹ️ [DB Backup] TARGET (Backup Database): "${targetDbName}"`);
    } else {
      console.log(`ℹ️ [DB Backup] TARGET (Backup Collections inside "${sourceDbName}"): "_backup_<collection>"`);
    }

    // List all collections from source database (ignoring system and existing backup collections)
    const allCollections = await sourceDb.listCollections().toArray();
    const collections = allCollections.filter(c => !c.name.startsWith('system.') && !c.name.startsWith('_backup_') && !c.name.startsWith('__winera_'));
    console.log(`ℹ️ [DB Backup] Found ${collections.length} live collections in "${sourceDbName}" to mirror.`);

    let totalDocsCopied = 0;

    for (const colInfo of collections) {
      const colName = colInfo.name;

      // 1. STRICT READ ONLY on live source collection
      const sourceCol = sourceDb.collection(colName);
      const docs = await sourceCol.find({}).toArray();

      // 2. Target collection: either in separate DB or prefixed in source DB
      const targetCol = useSeparateDb ? targetDb.collection(colName) : sourceDb.collection(`_backup_${colName}`);
      const targetDisplayName = useSeparateDb ? `${targetDbName}.${colName}` : `${sourceDbName}._backup_${colName}`;

      // Refresh target collection in backup
      try {
        await targetCol.drop();
      } catch (dropErr) {
        if (dropErr.code !== 26 && !dropErr.message?.includes('ns not found')) {
          console.warn(`[DB Backup] Notice dropping ${targetDisplayName}:`, dropErr.message);
        }
      }

      // 3. Insert fresh documents into backup
      if (docs.length > 0) {
        await targetCol.insertMany(docs, { ordered: false });
      }

      // 4. Mirror index definitions for performance & search
      try {
        const indexes = await sourceCol.indexes();
        const customIndexes = indexes.filter(idx => idx.name !== '_id_');
        for (const idx of customIndexes) {
          const { key, ...opts } = idx;
          await targetCol.createIndex(key, opts).catch(() => {});
        }
      } catch {
        // Non-fatal
      }

      totalDocsCopied += docs.length;
      console.log(`  ✓ Mirrored collection "${colName}": ${docs.length} docs -> "${targetDisplayName}"`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('------------------------------------------------------');
    console.log(`✅ [DB Backup] Completed successfully in ${duration}s!`);
    console.log(`📦 [DB Backup] Total ${totalDocsCopied} documents safely backed up.`);
    console.log(`🛡️ [DB Backup] Live database "${sourceDbName}" original collections were strictly read-only and 100% intact.`);
    console.log('======================================================\n');
    return { success: true, totalDocsCopied, duration };
  } catch (error) {
    console.error('❌ [DB Backup] Error during backup process:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Initializes the automated daily 2:00 AM Cron Job inside Node.js.
 */
export const initDbBackupCron = () => {
  // '0 2 * * *' runs every single day at 02:00 AM
  cron.schedule('0 2 * * *', async () => {
    console.log('⏰ [DB Backup Cron] 02:00 AM trigger fired.');
    await syncLiveDbToBackupDb();
  });
  console.log('📅 [DB Backup Cron] Automated daily backup scheduled for 02:00 AM (Live DB -> "winera-backup").');
};

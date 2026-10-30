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
    const sourceDb = mongoose.connection.db;
    const sourceDbName = sourceDb.databaseName;
    const targetDbName = process.env.MONGODB_BACKUP_DB_NAME || `${sourceDbName}-backup`;

    // STRICT SAFETY CHECK: Ensure target is never the source database!
    if (sourceDbName === targetDbName) {
      throw new Error(`CRITICAL SAFETY ERROR: Target database (${targetDbName}) matches live database (${sourceDbName})! Aborting to prevent modifications.`);
    }

    console.log(`ℹ️ [DB Backup] SOURCE (Live, Read-Only): "${sourceDbName}"`);
    console.log(`ℹ️ [DB Backup] TARGET (Backup Database): "${targetDbName}"`);

    const targetDb = client.db(targetDbName);

    // List all collections from source database
    const collections = await sourceDb.listCollections().toArray();
    console.log(`ℹ️ [DB Backup] Found ${collections.length} collections in live database to copy.`);

    let totalDocsCopied = 0;

    for (const colInfo of collections) {
      const colName = colInfo.name;

      // Skip internal MongoDB system collections
      if (colName.startsWith('system.')) continue;

      // 1. STRICT READ ONLY on live source collection
      const sourceCol = sourceDb.collection(colName);
      const docs = await sourceCol.find({}).toArray();

      // 2. Target collection inside winera-backup
      const targetCol = targetDb.collection(colName);

      // Refresh target collection in winera-backup
      try {
        await targetCol.drop();
      } catch (dropErr) {
        // NamespaceNotFound is expected if target collection doesn't exist yet
        if (dropErr.code !== 26 && !dropErr.message?.includes('ns not found')) {
          console.warn(`[DB Backup] Notice dropping ${colName} in backup db:`, dropErr.message);
        }
      }

      // 3. Insert fresh documents into winera-backup
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
      console.log(`  ✓ Copied collection "${colName}": ${docs.length} docs -> "${targetDbName}.${colName}"`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('------------------------------------------------------');
    console.log(`✅ [DB Backup] Completed successfully in ${duration}s!`);
    console.log(`📦 [DB Backup] Total ${totalDocsCopied} documents mirrored into "${targetDbName}".`);
    console.log(`🛡️ [DB Backup] Live database "${sourceDbName}" was strictly read-only and is 100% intact.`);
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

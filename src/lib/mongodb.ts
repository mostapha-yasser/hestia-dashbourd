import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dashboardDbName = process.env.DASHBOARD_MONGODB_DB as string;
const hestiaDbName = process.env.HESTIA_MONGODB_DB as string;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

if (!dashboardDbName || !hestiaDbName) {
  throw new Error('Please define both DASHBOARD_MONGODB_DB and HESTIA_MONGODB_DB environment variables');
}

let cachedClient: MongoClient | null = null;
let cachedDashboardDb: Db | null = null;
let cachedHestiaDb: Db | null = null;

export async function connectToDatabase(dbType: 'dashboard' | 'main') {
  if (!cachedClient) {
    cachedClient = await MongoClient.connect(uri);
  }

  if (dbType === 'dashboard') {
    if (!cachedDashboardDb) {
      cachedDashboardDb = cachedClient.db(dashboardDbName);
    }
    return { client: cachedClient, db: cachedDashboardDb };
  } else if (dbType === 'main') {
    if (!cachedHestiaDb) {
      cachedHestiaDb = cachedClient.db(hestiaDbName);
    }
    return { client: cachedClient, db: cachedHestiaDb };
  }
  
  throw new Error('Invalid database type. Use "dashboard" or "main"');
}
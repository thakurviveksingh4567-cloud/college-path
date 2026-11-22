import mongoose from 'mongoose';
import { sampleColleges, sampleScholarships, sampleAdmissionEvents, sampleUsers } from './seedData.js';
import College from '../models/College.js';
import Scholarship from '../models/Scholarship.js';
import AdmissionEvent from '../models/AdmissionEvent.js';
import User from '../models/User.js';

let isDemoMode = false;

// In-memory data store for fallback when MongoDB is not running
export const memoryStore = {
  colleges: JSON.parse(JSON.stringify(sampleColleges)),
  scholarships: JSON.parse(JSON.stringify(sampleScholarships)),
  events: JSON.parse(JSON.stringify(sampleAdmissionEvents)),
  users: JSON.parse(JSON.stringify(sampleUsers)),
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/collegepath';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    isDemoMode = false;

    // Seed if empty
    const collegeCount = await College.countDocuments();
    if (collegeCount === 0) {
      console.log('[Database] Seeding sample verified college data to MongoDB...');
      await College.insertMany(sampleColleges);
      await Scholarship.insertMany(sampleScholarships);
      await AdmissionEvent.insertMany(sampleAdmissionEvents);
      for (const u of sampleUsers) {
        await User.create(u);
      }
      console.log('[Database] MongoDB seeded successfully.');
    }
  } catch (err) {
    console.warn(`[Database] MongoDB not reachable at ${uri}.`);
    console.log('[Database] Activating high-performance IN-MEMORY DEMO MODE with verified realistic sample data.');
    isDemoMode = true;
  }
};

export const getDBStatus = () => ({
  isDemoMode,
  driver: isDemoMode ? 'InMemory-RealisticDemo' : 'MongoDB-Live',
  timestamp: new Date().toISOString()
});

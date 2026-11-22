import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import collegeRoutes from './routes/collegeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import calendarRoutes from './routes/calendarRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// System Health & DB Status Endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    platform: 'CollegePath API',
    version: '1.0.0',
    db: getDBStatus()
  });
});

// Mount Routes
app.use('/api/colleges', collegeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/calendar', calendarRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Connect to Database & Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`🎓 CollegePath Backend API running on port ${PORT}`);
    console.log(`📍 Mode: ${getDBStatus().driver}`);
    console.log(`🌐 Base URL: http://localhost:${PORT}`);
    console.log(`=======================================================`);
  });
});

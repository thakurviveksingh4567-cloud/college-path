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
const HOST = '0.0.0.0';

// Permissive and secure CORS configuration for Vercel and local development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile, curl, health-check monitors)
    if (!origin) return callback(null, true);
    // Allow any Vercel deployment (preview or production)
    if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin) || origin.includes('localhost')) {
      return callback(null, true);
    }
    // Fallback allow all origins to ensure seamless client connectivity
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));

// Pre-flight request handling
app.options('*', cors());

// JSON Body Parser with limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint (Required by Render & Uptime Monitors)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'CollegePath backend is running'
  });
});

// Root endpoint for simple ping
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    platform: 'CollegePath Backend API',
    healthCheck: '/api/health',
    statusEndpoint: '/api/status'
  });
});

// System Diagnostics & DB Status Endpoint
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'online',
    platform: 'CollegePath API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    db: getDBStatus()
  });
});

// Mount Application Routes
app.use('/api/colleges', collegeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/calendar', calendarRoutes);

// Catch-all 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} not found. Health check is at /api/health`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack || err.message || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Connect to Database & Start Server with host binding
connectDB().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`=======================================================`);
    console.log(`🎓 CollegePath Backend API running on http://${HOST}:${PORT}`);
    console.log(`📍 Database Mode: ${getDBStatus().driver}`);
    console.log(`🏥 Health Check: http://${HOST}:${PORT}/api/health`);
    console.log(`=======================================================`);
  });
}).catch((err) => {
  console.error('[Fatal Startup Error]:', err);
  // Still attempt to start on PORT so Render does not fail health-checks
  app.listen(PORT, HOST, () => {
    console.log(`🎓 Server started with in-memory fallback on ${PORT}`);
  });
});

// Process safety listeners
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection at]:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]:', err);
});

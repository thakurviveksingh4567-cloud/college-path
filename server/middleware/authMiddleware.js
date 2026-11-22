import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { memoryStore, getDBStatus } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'collegepath_secure_secret_key_2026_prod';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { isDemoMode } = getDBStatus();

    if (isDemoMode) {
      const user = memoryStore.users.find(u => u.email === decoded.email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found in demo session' });
      }
      req.user = user;
      return next();
    } else {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
      req.user = user;
      return next();
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token verification failed or expired' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Access denied: Admin credentials required' });
  }
};

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

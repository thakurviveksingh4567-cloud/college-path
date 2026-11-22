import User from '../models/User.js';
import College from '../models/College.js';
import { memoryStore, getDBStatus } from '../config/db.js';
import { generateToken } from '../middleware/authMiddleware.js';
import bcrypt from 'bcryptjs';

// @desc    Register new student
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email and password' });
    }

    const { isDemoMode } = getDBStatus();

    if (isDemoMode) {
      const existing = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: 'usr_' + Date.now(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'student',
        profile: profile || {
          stream: 'PCM',
          class12Percentage: 85,
          category: 'General',
          homeState: 'Delhi',
          preferredCourse: 'B.Tech Computer Science & Engineering',
          annualBudget: 300000,
          needHostel: true,
          entranceExams: { jeeMain: { taken: false }, cuet: { taken: false } }
        },
        savedColleges: []
      };

      memoryStore.users.push(newUser);
      const token = generateToken({ id: newUser._id, email: newUser.email, role: newUser.role });

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          profile: newUser.profile,
          savedColleges: newUser.savedColleges
        }
      });
    } else {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      const user = await User.create({
        name,
        email,
        password,
        role: 'student',
        profile: profile || {}
      });

      const token = generateToken({ id: user._id, email: user.email, role: user.role });

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          savedColleges: user.savedColleges
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const { isDemoMode } = getDBStatus();

    if (isDemoMode) {
      const user = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }

      // Check password (matches plain or bcrypt)
      const isMatch = user.password === password || await bcrypt.compare(password, user.password).catch(() => false);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken({ id: user._id || user.email, email: user.email, role: user.role });
      return res.json({
        success: true,
        token,
        user: {
          id: user._id || user.email,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          savedColleges: user.savedColleges || []
        }
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = generateToken({ id: user._id, email: user.email, role: user.role });
      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          savedColleges: user.savedColleges
        }
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const { isDemoMode } = getDBStatus();
    let user = req.user;

    // Attach full college objects for savedColleges
    let fullSavedColleges = [];
    const collegesList = isDemoMode ? memoryStore.colleges : await College.find({}).lean();

    if (user.savedColleges && user.savedColleges.length > 0) {
      fullSavedColleges = user.savedColleges.map(sc => {
        const collegeObj = collegesList.find(c => c.slug === sc.collegeId || c._id?.toString() === sc.collegeId);
        return {
          ...sc,
          college: collegeObj || null
        };
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
        savedColleges: fullSavedColleges
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Update student profile details
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const { isDemoMode } = getDBStatus();

    if (isDemoMode) {
      const userIndex = memoryStore.users.findIndex(u => u.email === req.user.email);
      if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      memoryStore.users[userIndex].profile = {
        ...memoryStore.users[userIndex].profile,
        ...profileData
      };
      return res.json({
        success: true,
        message: 'Profile updated successfully',
        profile: memoryStore.users[userIndex].profile
      });
    } else {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      user.profile = { ...user.profile.toObject(), ...profileData };
      await user.save();
      return res.json({
        success: true,
        message: 'Profile updated successfully',
        profile: user.profile
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Save / bookmark a college or update notes/status
// @route   POST /api/auth/saved-colleges
export const saveCollege = async (req, res) => {
  try {
    const { collegeId, notes = '', applicationStatus = 'Shortlisted' } = req.body;
    if (!collegeId) {
      return res.status(400).json({ success: false, message: 'College ID is required' });
    }

    const { isDemoMode } = getDBStatus();

    if (isDemoMode) {
      const user = memoryStore.users.find(u => u.email === req.user.email);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      if (!user.savedColleges) user.savedColleges = [];

      const existingIndex = user.savedColleges.findIndex(sc => sc.collegeId === collegeId);
      if (existingIndex > -1) {
        user.savedColleges[existingIndex].notes = notes;
        user.savedColleges[existingIndex].applicationStatus = applicationStatus;
      } else {
        user.savedColleges.push({ collegeId, notes, applicationStatus, savedAt: new Date() });
      }
      return res.json({ success: true, message: 'Saved colleges updated', savedColleges: user.savedColleges });
    } else {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      const existingIndex = user.savedColleges.findIndex(sc => sc.collegeId === collegeId);
      if (existingIndex > -1) {
        user.savedColleges[existingIndex].notes = notes;
        user.savedColleges[existingIndex].applicationStatus = applicationStatus;
      } else {
        user.savedColleges.push({ collegeId, notes, applicationStatus });
      }
      await user.save();
      return res.json({ success: true, message: 'Saved colleges updated', savedColleges: user.savedColleges });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Remove saved college
// @route   DELETE /api/auth/saved-colleges/:collegeId
export const removeSavedCollege = async (req, res) => {
  try {
    const { collegeId } = req.params;
    const { isDemoMode } = getDBStatus();

    if (isDemoMode) {
      const user = memoryStore.users.find(u => u.email === req.user.email);
      if (user && user.savedColleges) {
        user.savedColleges = user.savedColleges.filter(sc => sc.collegeId !== collegeId);
      }
      return res.json({ success: true, message: 'Removed from saved colleges' });
    } else {
      const user = await User.findById(req.user._id);
      if (user) {
        user.savedColleges = user.savedColleges.filter(sc => sc.collegeId !== collegeId);
        await user.save();
      }
      return res.json({ success: true, message: 'Removed from saved colleges' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

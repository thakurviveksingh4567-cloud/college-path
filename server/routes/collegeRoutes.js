import express from 'express';
import { 
  getColleges, 
  getCollegeBySlug, 
  compareColleges, 
  createCollege, 
  updateCollege, 
  deleteCollege, 
  resetColleges 
} from '../controllers/collegeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getColleges);
router.post('/compare', compareColleges);
router.get('/:slug', getCollegeBySlug);

// Admin Protected Routes
router.post('/', protect, adminOnly, createCollege);
router.put('/:slug', protect, adminOnly, updateCollege);
router.delete('/:slug', protect, adminOnly, deleteCollege);
router.post('/admin/reset', protect, adminOnly, resetColleges);

export default router;

import express from 'express';
import { getScholarships, getScholarshipBySlug } from '../controllers/scholarshipController.js';

const router = express.Router();

router.get('/', getScholarships);
router.get('/:slug', getScholarshipBySlug);

export default router;

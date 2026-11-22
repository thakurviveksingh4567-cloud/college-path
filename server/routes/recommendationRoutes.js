import express from 'express';
import { predictAdmission } from '../controllers/recommendationController.js';

const router = express.Router();

router.post('/predict', predictAdmission);

export default router;

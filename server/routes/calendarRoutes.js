import express from 'express';
import { getAdmissionEvents } from '../controllers/calendarController.js';

const router = express.Router();

router.get('/', getAdmissionEvents);

export default router;

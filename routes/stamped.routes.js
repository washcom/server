import express from 'express';
import { addStampedFile,allStamped } from '../controllers/stamped.controller.js';
const router = express.Router();
router.post('/add-stamped-file', addStampedFile);
router.get('/all-stamped',allStamped);
export default router;
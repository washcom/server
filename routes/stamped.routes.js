import express from 'express';
import { addStampedFile,allStamped,lastDigit } from '../controllers/stamped.controller.js';
const router = express.Router();
router.post('/add-stamped-file', addStampedFile);
router.get('/all-stamped',allStamped);
router.get('/last-serial/:lastDigit',lastDigit);
export default router;
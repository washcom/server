import express from 'express';
import { addStampedFile } from '../controllers/stamped.controller.js';
const router = express.Router();
router.post('/add-stamped-file', addStampedFile);
export default router;
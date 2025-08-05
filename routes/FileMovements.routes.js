import express from 'express';
import { addFileMovement } from '../controllers/FileMovement.controller.js';
const router = express.Router();
// Route to add a file movement
router.post('/add-file-movement', addFileMovement);

export default router;
import express from 'express';
import { addFileMovement,allMovements } from '../controllers/FileMovement.controller.js';
const router = express.Router();
// Route to add a file movement
router.post('/add-file-movement', addFileMovement);
router.get('/all-movements',allMovements);
export default router;
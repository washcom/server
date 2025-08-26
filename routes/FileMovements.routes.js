import express from 'express';
import { addFileMovement,allMovements,editMovement,returnMovement } from '../controllers/FileMovement.controller.js';
const router = express.Router();
// Route to add a file movement
router.post('/add-file-movement', addFileMovement);
router.get('/all-movements',allMovements);
router.put('/update/:id',editMovement);
router.put('/return/:id',returnMovement);
export default router;
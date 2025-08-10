import express from 'express';
import { addFileFromCounty,allFromCounty } from '../controllers/filefromcounty.controller.js';
const router = express.Router();
router.post('/add-file-from-county', addFileFromCounty);
router.get('/all-from-county',allFromCounty);
export default router;
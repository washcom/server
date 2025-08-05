import express from 'express';
import { addFileFromCounty } from '../controllers/filefromcounty.controller.js';
const router = express.Router();
router.post('/add-file-from-county', addFileFromCounty);
export default router;
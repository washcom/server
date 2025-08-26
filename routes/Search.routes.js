import express from 'express';
import { searchController } from '../controllers/Search.controller.js';
const router = express.Router();
router.get('/', searchController);
export default router;
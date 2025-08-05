import express from 'express';
import { createSecondment } from '../controllers/Tos_Secondment.controller.js';
const router = express.Router();
router.post('/create', createSecondment);
export default router;
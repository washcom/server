import express from 'express';
import { createSecondment,allSecondments } from '../controllers/Tos_Secondment.controller.js';
const router = express.Router();
router.post('/create', createSecondment);
router.get('/all-secondments',allSecondments);
export default router;
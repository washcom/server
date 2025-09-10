import express from 'express';
import {createFiveDigitEmployee,getAllFiveDigitFiles} from '../controllers/5-digit.controller.js';

const router = express.Router();
router.post('/create', createFiveDigitEmployee);
router.get('/all', getAllFiveDigitFiles);
export default router;
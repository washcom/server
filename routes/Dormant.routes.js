import {  allDormant,createDormantFileAndEmployee } from "../controllers/Dormant.controller.js";
import express from 'express';

const router = express.Router();
router.post('/create-dormant-employee', createDormantFileAndEmployee);
router.get('/all-dormant', allDormant);
export default router;
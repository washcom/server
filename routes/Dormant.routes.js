import { CreateDormantFile, allDormant } from "../controllers/Dormant.controller.js";
import express from 'express';

const router = express.Router();
router.post('/create', CreateDormantFile);
router.get('/all-dormant', allDormant);

export default router;
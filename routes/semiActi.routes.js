import { createSemiActive,allSemiActive } from "../controllers/semiActive.controller.js";
import express from 'express';

const router = express.Router();
router.post('/create', createSemiActive);
router.get('/all-semi',allSemiActive);
export default router;
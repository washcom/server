import { createSemiActive } from "../controllers/semiActive.controller.js";
import express from 'express';

const router = express.Router();
router.post('/create', createSemiActive);
export default router;
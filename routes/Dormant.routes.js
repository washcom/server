import { CreateDormantFile } from "../controllers/Dormant.controller.js";
import express from 'express';

const router = express.Router();
router.post('/create', CreateDormantFile);

export default router;
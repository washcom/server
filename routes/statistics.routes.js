import express, { Router } from "express";
import { allStats } from "../controllers/statistics.controller.js";

const router = express.Router()
router.get('/all-stats',allStats);
export default router;
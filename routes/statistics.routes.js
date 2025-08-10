import express, { Router } from "express";
import { allStats } from "../controllers/statistics.controller.js";
import { checkAuthenticated } from "../AuthMiddleWare/middleware.js";

const router = express.Router()
router.get('/all-stats',checkAuthenticated, allStats);
export default router;
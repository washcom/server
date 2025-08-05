import express from "express";
import { addFilesToCounty } from "../controllers/filesToCounty.controller.js";
const router = express.Router();
// Route to add a file to county
router.post('/add-file-to-county', addFilesToCounty);
export default router;

import express from "express";
import { addFilesToCounty,allToCounty } from "../controllers/filesToCounty.controller.js";
const router = express.Router();
// Route to add a file to county
router.post('/add-file-to-county', addFilesToCounty);
router.get('/all-to-county',allToCounty);
export default router;

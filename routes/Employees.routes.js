import express from 'express';
import { addemployee } from '../controllers/Employees.controller.js';
import { getEmployees } from '../controllers/Employees.controller.js';


const router = express.Router();
router.post('/add-employee', addemployee);
router.get('/list-employees', getEmployees);
export default router;
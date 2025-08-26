import express from 'express';
import { addemployee } from '../controllers/Employees.controller.js';
import { getEmployees,updateEmployee } from '../controllers/Employees.controller.js';


const router = express.Router();
router.post('/add-employee', addemployee);
router.get('/list-employees', getEmployees);
router.put('/update/:id',updateEmployee);
export default router;
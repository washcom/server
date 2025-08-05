import express from 'express';
import { getOneuser,addUser,allUsers,changeRole,deleteUser } from '../controllers/Users.controller.js';
const router = express.Router();
router.get('/by-payroll/:payrollNo', getOneuser);
router.post('/create',addUser);
router.get('/all-users',allUsers);
router.put('/change-role/:userId',changeRole);
router.delete('/delete-user/:userId',deleteUser);
export default router;
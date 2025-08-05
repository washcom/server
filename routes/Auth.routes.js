import express, { Router } from "express";
import { AuthRegister,Authsignin,logout,requestReset,resetPassword } from "../controllers/Auth.Controller.js";

const router = express.Router();
router.post('/signup',AuthRegister);
router.post('/sign-in',Authsignin);
router.post('/logout',logout);
router.post('/request-reset',requestReset);
router.post('/reset-password/:token',resetPassword);
export default router;
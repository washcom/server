import express, { Router } from "express";
import { AuthRegister,Authsignin,logout,requestReset,resetPassword,Me } from "../controllers/Auth.Controller.js";
import { rejectIfAuthenticated } from "../AuthMiddleWare/RejectIfAuthenticated.js";
import { checkAuthenticated } from "../AuthMiddleWare/middleware.js";


const router = express.Router();
router.post('/signup',rejectIfAuthenticated,AuthRegister);
router.post('/sign-in',rejectIfAuthenticated, Authsignin);
router.post('/logout',checkAuthenticated,logout);
router.get('/me',checkAuthenticated,Me);
router.post('/request-reset',requestReset);
router.post('/reset-password/:token',resetPassword);
export default router;
import express from "express";
import { login, register,upDateProfile,Logout } from "../controller/user.controller.js";
import isAuthenticated from "../Middlewares/AuthMiddleWares.js";
import {singleUpload}  from '../Middlewares/multer.js';

const router = express.Router();


router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/Logout").post(Logout);
router.route("/upateprofile").post(isAuthenticated, singleUpload,upDateProfile);

export default router
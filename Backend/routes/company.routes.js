import express from "express";
import { companyRegister, getAllCompany,getCompanyById ,updateCompany} from "../controller/company.controller.js";
import isAuthenticated from "../Middlewares/AuthMiddleWares.js";
import {singleUpload}  from '../Middlewares/multer.js';

const router = express.Router();


router.route("/registerCompany").post(isAuthenticated,companyRegister);
router.route("/getallcompany").get(isAuthenticated,getAllCompany);
router.route("/getcompanybyid/:id").get(isAuthenticated,getCompanyById);
router.route("/companyupdate/:id").put(isAuthenticated,singleUpload , updateCompany);


export default router
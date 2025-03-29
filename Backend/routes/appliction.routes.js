import express from "express";
import {applyJob,getAppliedJobs,getApplicant,updateStatus} from "../controller/application.controller.js";
import isAuthenticated from "../Middlewares/AuthMiddleWares.js";


const router = express.Router();


router.route("/applyjob/:id").get(isAuthenticated,applyJob);
router.route("/getappliedjobs").get(isAuthenticated,getAppliedJobs)
router.route("/getapplicant/:id").get(isAuthenticated,getApplicant)
router.route("/updatestatus/:id").put(isAuthenticated,updateStatus)




export default router
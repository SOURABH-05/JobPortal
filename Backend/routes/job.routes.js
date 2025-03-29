import express from "express";
import { jobPost,getAllJobs ,getJobById ,getAdminJobs} from "../controller/jobs.controller.js";
import isAuthenticated from "../Middlewares/AuthMiddleWares.js";


const router = express.Router();


router.route("/jobpost").post(isAuthenticated,jobPost);
router.route("/getalljobs").get(isAuthenticated,getAllJobs);
router.route("/getjobbyid/:id").get(isAuthenticated,getJobById);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);




export default router
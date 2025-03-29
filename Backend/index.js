import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from 'mongoose';

import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js"
import jobRoute from "./routes/job.routes.js"
import applicationRoute from "./routes/appliction.routes.js"
import dotenv from "dotenv";

dotenv.config({});

const app = express();
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 app.use(cookieParser());

 const corsOptions ={

    origin:"https://jobportalt05.onrender.com",
    credentials: true
 }
 

 app.use(cors(corsOptions));
 async function main() {
    try {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }
  
  main();

 
  app.use("/api/v1/user",userRoute)
  app.use("/api/v1/company",companyRoute)
  app.use("/api/v1/job",jobRoute)
  app.use("/api/v1/application",applicationRoute)

  // const PORT =8001
 const PORT =process.env.PORT;
 app.listen(PORT,()=>{
    console.log(`Server running at: http://localhost:${PORT}`);
 })
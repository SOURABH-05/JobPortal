import { populate } from "dotenv";
import { Application } from "../Model/application.model.js";
import { Job } from "../Model/job.model.js"; // Make sure the Job model is imported

export const applyJob = async (req, res) => {
  try {
    const userId = req.id; // Assuming userId is in the request (e.g., set by authentication middleware)
    const jobId = req.params.id;
    

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required",
        success: false
      });
    }

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false
      });
    }

    // Retrieve the job document from the database
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    // Create a new application for the job
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    });

    // Add the new application to the job's applications array
    job.applications.push(newApplication._id);
    await job.save();

    // Return success response
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
      newApplication
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while applying for the job",
      success: false
    });
  }
};

export const getAppliedJobs = async(req,res) => {
try {
    const userId = req.id;

    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:"job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}},
        }

    })

    if(!application){
        return res.status(500).json({
            message: "Job not found",
            success: false
          }); 
    }

    
      return res.status(201).json({
        message: "job fetch sucessfully",
        success: true,
application

      });

    
} catch (error) {
    console.log(error)
    return res.status(500).json({
        message: "An error occurred while applying for the job",
        success: false
      });
}

}

export const getApplicant = async(req,res)=>{
    try {
        
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant",
                options:{sort:{createdAt:-1}},
                
            }
        })
        if(!job){
            return res.status(400).json({
                message: "jon not found",
                success: false,
         });  
        }
        return res.status(201).json({
            job,
            success: true,
    
    
          });


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "An error occurred while fetching job",
            success: true,
          });
    }

}


export const  updateStatus = async(req,res)=>{
    try {
        
        const {status }= req.body;
         const applicantId = req.params.id;
     
         if(!status){
            return res.status(400).json({
                message: "Status is required",
                success: false,
              });
         }

         const application = await Application.findOne({_id:applicantId})
         if(!application){
            return res.status(400).json({
                message: "application not found",
                success: false,
              }); 

            }
            application.status = status.toLowerCase();
            await application.save()

            return res.status(200).json({
                message: "Status updated successfully",
                success: true,
                application,
              });
    } catch (error) {
        console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the status",
      success: false,
    });
    }
    
}
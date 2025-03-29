import { Company } from "../Model/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudnary.js";

export const companyRegister = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Check if companyName is provided
    if (!companyName) {
      return res.status(400).json({
        message: "Company Name required",
        success : false,
      });
    }

    // Check if the company already exists in the database
    const existingCompany = await Company.findOne({ name: companyName });

    if (existingCompany) {
      return res.status(400).json({
        message: "Can't create company with the same name",
        success: false,
      });
    }

    // Create a new company if it doesn't already exist
    const company = await Company.create({
      name: companyName,
      userId: req.id, // Make sure req.id is correctly set by your auth middleware
    });

    return res.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};


export const getAllCompany = async(req,res) =>{

    try {
        const userId = req.id
      const companies =await Company.find({userId})
      if(!companies){
        return res.status(400).json({
            message:"Company not found",
            success: false
        })
      } 
      return res.status(200).json({
        message: "Companies retrieved successfully",
        companies,
        success: true,
      });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error",
            success: false,
          });
    }
} 

export const  getCompanyById = async(req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(400).json({
                message:"Company not found",
                success: false
            })
          } 
          return res.status(200).json({
            message: "Company reytrieved successfully",
            company,
            success: true,
          });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server Error",
            success: false,
          });
    
    }
}


export const updateCompany = async(req,res) =>{

    try {
        const {name, description,website, location} = req.body;
        const file = req.file;
         const fileuri = getDataUri(file);
        
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content, {
            
            access_mode: 'public',  // Ensure file is publicly accessible
          });

          const logo = cloudResponse.secure_url;
        
        const Updatedata = {name, description,website, location, logo}
        const companyId = req.params.id
        const company =  await Company.findByIdAndUpdate(companyId, Updatedata, {new:true})
        if(!company){
           return res.status(400).json({
            message:"company not found",
            success:false
           })
        }
        return res.status(201).json({
            message:"information update successfully",
            success: true,
            company,
        })
    } catch (error) {
        console.log(error);  // Log the error for debugging
        return res.status(500).json({
          message: "Server error, please try again later",
          success: false,
        });
    }
}
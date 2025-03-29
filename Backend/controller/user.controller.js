import { User } from "../Model/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudnary.js";

export const register = async (req, res) => {


    try {
        const {fullname, email, phoneNumber, password, role } = req.body;
        const file = req.file;
        const fileuri = getDataUri(file);

        const cloudResponse = await cloudinary.uploader.upload(fileuri.content, {
            
            access_mode: 'public',  // Ensure file is publicly accessible
          });






        
        if (!fullname || !email || !phoneNumber || !password || !role) {

            return res.status(400).json({
                message: "Something is missing",
                sucess: "false"
            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User alredy exist with this mail. ',
                sucess: false
            })
        }

        

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({

            fullname,
             email, 
             phoneNumber, 
             password: hashedPassword,
              role,
              profile: {
                profilePhoto : cloudResponse.secure_url,
            }
        })
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }

}

export const login = async (req, res) => {
    try {
        let { email, password, role } = req.body;
        
        if (!email || !password || !role) {

            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: ' Incorrect email or password ',
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: ' Incorrect email or password ',
                success: false
            })

        };

        if (role !== user.role) {

            return res.status(400).json({
                message: " Account doesn't exits current role ",
                success: false
            })

        };
        const tokenData = {
            userId: user._id
        };

        const token = jwt.sign(tokenData, process.env.SECRET, { expiresIn: '1d' });
        const userResponse = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Wellcome back ${user.fullname}`,
            user:userResponse,
            success: true
        })


    } catch (error) {
        console.log(error);
    }

}
export const Logout = async(req,res) =>{


try {
    return res.status(200).cookie("token", "", { maxAge: 0}).json({
        message: "logged out successfully",
       
        success: true
    })


} catch (error) {
    console.log(error)
}
}


export const upDateProfile = async(req,res) => {
     try {
        const { fullname, email, phoneNumber, bio, skills} = req.body;
        
        const file = req.file;
        const fileuri = getDataUri(file);
        
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content, {
            
            access_mode: 'public',  // Ensure file is publicly accessible
          });
          
        
        
        
        const skillArray = skills.split(",");
        const userId =  req.id;
        
        let user = await User.findById(userId);
        
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file?.originalname;  // Fix: Use `originalname` in lowercase
        }
        

      if(fullname)user.fullname = fullname;
      if(email)user.email = email;
      if(phoneNumber)user.phoneNumber = phoneNumber;
      if(bio)user.profile.bio =bio;
      if(skills)user.profile.skills = skillArray



         await user.save()

          user = {
           
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile

            
         }
          return  res.status(200).json({
            message:"Profile Update sucessfully",
            user,
            success:"true"

          })
        
     } catch (error) {
        console.log(error)
     }

}



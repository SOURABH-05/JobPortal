import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET    // Click 'View API Keys' above to copy your API secret
});

export default cloudinary
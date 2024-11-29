const cloudinary = require("cloudinary").v2;
const crypto = require('crypto');
require('dotenv').config()

const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    if (!process.env.CLOUDINARY_CLOUD_NAME || 
        !process.env.CLOUDINARY_API_KEY || 
        !process.env.CLOUDINARY_API_SECRET) {
        throw new Error("Missing Cloudinary configuration environment variables.");
    }
}

const generateSignature = (paramsToSign) => {
    const api_secret = process.env.CLOUDINARY_API_SECRET;
    const sortedParams = Object.keys(paramsToSign).sort().map(key=>`${key}=${paramsToSign[key]}`).join("&");
    const signature = crypto.createHash('sha1').update(sortedParams+api_secret).digest("hex");

    return signature;
}

const uploadToCloudinary = async (filePath) => {
    try {
       cloudinaryConfig();
       const timestamp = Math.round((new Date()).getTime() / 1000);
       const paramsToSign = {
          timestamp,
       };
       const signature = generateSignature(paramsToSign);
       const result = await cloudinary.uploader.upload(filePath, {
          ...paramsToSign,
          signature,
          api_key : process.env.CLOUDINARY_API_KEY
       });
       return result;
    } catch (error) {
       console.error(error);
    }
}

module.exports = uploadToCloudinary 
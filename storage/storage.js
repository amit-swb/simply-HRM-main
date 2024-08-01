const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hrm",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const storageEmployee = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "employee_img",
    allowedFormats: ["jpeg", "png", "jpg"],
  },
});

const storageHr = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hr_img',
    allowedFormats: ['jpg', 'png', 'jpeg']
  }
});

module.exports = { storage, storageEmployee, storageHr };

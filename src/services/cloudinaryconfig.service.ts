import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { envConfig } from "../config/config";

cloudinary.config({
  cloud_name: envConfig.cloudName,
  api_key: envConfig.cloudinaryApiKey,
  api_secret: envConfig.cloudinaryApiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "fullstack-sass",
  }),
});

export { cloudinary, storage };

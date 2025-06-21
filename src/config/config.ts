import { config } from "dotenv";
config();

export const envConfig = {
  portNumber: process.env.PORT,
  localHost: process.env.DB_HOST,
  database: process.env.DB_NAME,
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,

  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
};

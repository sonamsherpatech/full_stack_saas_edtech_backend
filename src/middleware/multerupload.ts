import multer from "multer";
import { cloudinary, storage } from "./../services/cloudinaryconfig.service";
import { Request } from "express";

const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, png and jpg is supported!!"));
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export default upload;

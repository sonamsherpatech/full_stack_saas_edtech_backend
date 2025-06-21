import express, { Request, Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncerrorhandler.service";
import CourseController from "../../../controller/institute/course/course.controller";

// for local file storage
// import { multer, storage } from "./../../../middleware/multermiddleware";
// const upload = multer({ storage: storage });

import multer from "multer";
import {
  cloudinary,
  storage,
} from "./../../../services/cloudinaryconfig.service";

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

const router: Router = express.Router();

//fieldname -- frontend/postman bata file aauda k naam bata aauxa tyo
router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    upload.single("courseThumbnail"),
    asyncErrorHandler(CourseController.createCourse)
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.getAllCourses)
  );

router
  .route("/:id")
  .get(asyncErrorHandler(CourseController.getSingleCourse))
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.deleteCourse)
  );

export default router;

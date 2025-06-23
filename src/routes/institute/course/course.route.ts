import express, { Request, Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncerrorhandler.service";
import CourseController from "../../../controller/institute/course/course.controller";

// for local file storage
// import { multer, storage } from "./../../../middleware/multermiddleware";
// const upload = multer({ storage: storage });

import multer from "multer";
import upload from "../../../middleware/multerupload";

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

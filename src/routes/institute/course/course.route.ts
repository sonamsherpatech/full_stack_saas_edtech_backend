import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncerrorhandler.service";
import CourseController from "../../../controller/institute/course/course.controller";

const router: Router = express.Router();

router
  .route("/")
  .post(Middleware.isLoggedIn, asyncErrorHandler(CourseController.createCourse))
  .get(asyncErrorHandler(CourseController.getAllCourses));

router
  .route("/:id")
  .get(asyncErrorHandler(CourseController.getSingleCourse))
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CourseController.deleteCourse)
  );

export default router;

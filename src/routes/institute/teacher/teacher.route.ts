import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncerrorhandler.service";
import TeacherController from "../../../controller/institute/teacher/teacher.controller";
import upload from "../../../middleware/multerupload";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    upload.single("teacherPhoto"),
    asyncErrorHandler(TeacherController.createTeacher)
  )
  .get(Middleware.isLoggedIn, asyncErrorHandler(TeacherController.getTeachers));

router
  .route("/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(TeacherController.deleteTeacher)
  );

export default router;

import express, { Router } from "express";
import InstituteController from "../../controller/institute/institute.controller";
import Middleware from "../../middleware/middleware";
import asyncErrorHandler from "../../services/asyncerrorhandler.service";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    InstituteController.createInstitute,
    InstituteController.createTeacherTable,
    InstituteController.createStudentTable,
    InstituteController.createCategoryTable,
    asyncErrorHandler(InstituteController.createCourseTable)
  );

export default router;

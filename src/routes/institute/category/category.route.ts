import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandler from "../../../services/asyncerrorhandler.service";
import CategoryController from "../../../controller/institute/category/category.controller";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.createCategory)
  )
  .get(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.getCategories)
  );

router
  .route("/:id")
  .delete(
    Middleware.isLoggedIn,
    asyncErrorHandler(CategoryController.deleteCategory)
  );

export default router;

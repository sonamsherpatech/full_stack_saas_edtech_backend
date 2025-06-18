import express, { Router } from "express";
import AuthController from "../../../controller/globals/auth/auth.controller";
import asyncErrorHandler from "../../../services/asyncerrorhandler.service";

const router: Router = express.Router();

router.route("/register").post(asyncErrorHandler(AuthController.registerUser));
router.route("/login").post(asyncErrorHandler(AuthController.loginUser));

export default router;

import { Router } from "express";
import authController from "./auth.controller";
import { bodyValidator } from "../middleware/zod.validator";
import { createUserDTO, loginUserDTO } from "./dto/auth.dto";
const authRouter = Router();

authRouter.post(
  "/register",
  bodyValidator(createUserDTO),
  authController.register,
);
authRouter.post("/login", bodyValidator(loginUserDTO), authController.login);

module.exports = authRouter;

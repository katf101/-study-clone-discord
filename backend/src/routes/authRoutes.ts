import express, { Router, Request, Response } from "express";
import authControllers from "../controllers/auth/authControllers";
import * as Joi from "joi";

import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator,
} from "express-joi-validation";
import { verifyToken as auth } from "../middleware/auth";

export const router: Router = express.Router();
const validator = createValidator();

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authControllers.controllers.postLogin
);

// test
router.get("/test", auth, (req: Request, res: Response) => {
  res.send("req passed");
});

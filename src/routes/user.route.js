import express from "express";
import { userController } from "../controllers/index.js";
import { body } from "express-validator";

const router = express.Router();
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  userController.login
);
router.post("/register", userController.register);
export default router;

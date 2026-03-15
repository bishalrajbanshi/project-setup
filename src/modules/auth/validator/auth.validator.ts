
import { whitelistFields } from "@/core/helper/validation.helper";
import { body, check } from "express-validator";

export const auth = [
  whitelistFields(["email", "password"]),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];



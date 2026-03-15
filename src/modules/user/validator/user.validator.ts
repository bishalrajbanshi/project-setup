import { whitelistFields } from "@/core/helper/validation.helper";
import { body, check } from "express-validator";

export const createPermissionValidator = [
  whitelistFields(["name", "email", "password"]),

  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string"),
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



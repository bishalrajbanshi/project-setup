import { check } from "express-validator";
import { whitelistFields } from "core/helper/validation.helper";

export const permissionActionCreateValidator = [
  whitelistFields(["action"]),
  check("action")
    .trim()
    .notEmpty()
    .withMessage("action is required")
    .bail()
    .isString()
    .withMessage("action must be a string"),
];

export const permissionActionUpdateValidator = [
  whitelistFields(["action"]),
  check("action")
    .trim()
    .optional()
    .isString()
    .withMessage("action must be a string"),
];

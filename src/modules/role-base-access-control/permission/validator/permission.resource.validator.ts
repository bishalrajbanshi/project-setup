import { check } from "express-validator";
import { whitelistFields } from "helper/validation.helper";

export const permissionResourceCreateValidator = [
  whitelistFields(["resources"]),

  check("resources")
    .trim()
    .notEmpty()
    .withMessage("Resources is required")
    .bail()
    .isString()
    .withMessage("Resources must be a string"),
];

export const permissionResourceUpdateValidator = [
  whitelistFields(["resources"]),
  check("resources")
    .trim()
    .optional()
    .isString()
    .withMessage("Resources must be a string"),
];

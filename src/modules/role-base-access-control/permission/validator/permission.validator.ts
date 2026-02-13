import { check } from "express-validator";
import { whitelistFields } from "helper/validation.helper";

export const permissionCreateValidator = [
  whitelistFields(["name", "description", "action", "resource"]),

  check("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string"),
  check("description")
    .trim()
    .notEmpty()
    .withMessage("description is required")
    .bail()
    .isString()
    .withMessage("description must be a string"),
  check("resource")
    .trim()
    .notEmpty()
    .withMessage("resource is required")
    .bail()
    .isString()
    .withMessage("resource must be a string"),
  check("action")
    .trim()
    .notEmpty()
    .withMessage("action is required")
    .bail()
    .isString()
    .withMessage("action must be a string"),
];

export const permissionUpdateValidator = [
  whitelistFields(["name", "description", "action", "resource"]),

  check("name")
    .trim()
    .optional()
    .isString()
    .withMessage("name must be a string"),
  check("description")
    .trim()
    .optional()
    .isString()
    .withMessage("description must be a string"),
  check("resource")
    .trim()
    .optional()
    .isString()
    .withMessage("resource must be a string"),
  check("action")
    .trim()
    .optional()
    .isString()
    .withMessage("action must be a string"),
];

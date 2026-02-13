import { RoleStatus } from "@prisma/client";
import { check } from "express-validator";
import { whitelistFields } from "helper/validation.helper";

export const roleCreateValidator = [
  whitelistFields(["name", "isSystem", "status"]),
  check("name").trim().notEmpty().withMessage("name is required"),
  check("isSystem")
    .optional()
    .notEmpty()
    .withMessage("isSystem is required")
    .isBoolean()
    .withMessage("isSystem must be a boolean"),
  check("status")
    .trim()
    .notEmpty()
    .withMessage("status is required")
    .isIn(Object.values(RoleStatus))
    .withMessage(
      `status must be one of ${Object.values(RoleStatus).join(", ")}`
    ),
];

export const roleUpdateValidator = [
  whitelistFields(["name", "isSystem", "status"]),

  check("name").trim().optional(),

  check("isSystem")
    .optional()
    .isBoolean()
    .withMessage("isSystem must be a boolean"),

  check("status")
    .trim()
    .optional()
    .isIn(Object.values(RoleStatus))
    .withMessage(
      `status must be one of ${Object.values(RoleStatus).join(", ")}`
    ),
];

import { RequestHandler, Router } from "express";
import { RolesController } from "../controllers/roles.controller";
import { body } from "express-validator";
import {
  checkValidation,
  whitelistFields,
} from "@/core/helper/validation.helper";

const router = Router({ mergeParams: true });
const rolesController = new RolesController();

router.post(
  "/",
  checkValidation([
    whitelistFields(["name", "isSystem", "status"]),
    body("name")
      .exists({ checkFalsy: true })
      .withMessage("name is required")
      .bail()
      .isString()
      .withMessage("name must be a string")
      .bail()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("name must be between 2 and 100 characters")
      .bail()
      .matches(/^[^\r\n]+$/)
      .withMessage("name must not contain line breaks"),
    body("isSystem")
      .optional()
      .isBoolean()
      .withMessage("isSystem must be a boolean"),
    body("status")
      .optional()
      .isIn(["active", "inactive"])
      .withMessage("status must be either active or inactive"),
  ]),
  rolesController.createRole
);
router.get("/:id", rolesController.findOne);
router.patch(
  "/:id",
  checkValidation([
    whitelistFields(["name", "isSystem", "status"]),
    body("name")
      .optional()
      .isString()
      .withMessage("name must be a string")
      .bail()
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage("name must be between 2 and 100 characters")
      .bail()
      .matches(/^[^\r\n]+$/)
      .withMessage("name must not contain line breaks"),
    body("isSystem")
      .optional()
      .isBoolean()
      .withMessage("isSystem must be a boolean"),
    body("status")
      .optional()
      .isIn(["active", "inactive"])
      .withMessage("status must be either active or inactive"),
  ]),
  rolesController.update
);

export default router;

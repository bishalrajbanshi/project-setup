import { Router } from "express";
import { roleController } from "../controller/role.controller";
import { checkValidation } from "core/helper/validation.helper";
import {
  roleCreateValidator,
  roleUpdateValidator,
} from "../validator/role.validator";
const router = Router();

router.get("/list", roleController.findManyRole);

router.post(
  "/",
  checkValidation(roleCreateValidator),
  roleController.createRole
);

router.get("/:id", roleController.findOneRole);

router.patch(
  "/:id",
  checkValidation(roleUpdateValidator),
  roleController.updateRole
);

router.delete("/:id", roleController.deleteRole);

export default router;

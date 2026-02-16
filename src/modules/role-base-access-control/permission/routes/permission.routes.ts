import { Router } from "express";
import { permissionController } from "../../permission/controller/permission.controller";
import { checkValidation } from "core/helper/validation.helper";
import {
  permissionCreateValidator,
  permissionUpdateValidator,
} from "../validator/permission.validator";
const router = Router();

router.get("/list", permissionController.findManyPermission);

router.get("/:id", permissionController.findOnePermission);

router.post(
  "/",
  checkValidation(permissionCreateValidator),
  permissionController.createPermission
);
router.patch(
  "/:id",
  checkValidation(permissionUpdateValidator),
  permissionController.updatePermission
);

router.delete("/:id", permissionController.deletePermission);

export default router;

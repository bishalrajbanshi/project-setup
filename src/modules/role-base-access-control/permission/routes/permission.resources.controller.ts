import { Router } from "express";
import { permissionResourcesController } from "../controller/permission.resources.controller";
import { checkValidation } from "helper/validation.helper";
import {
  permissionResourceCreateValidator,
  permissionResourceUpdateValidator,
} from "../validator/permission.resource.validator";
const router = Router();

router.get("/list", permissionResourcesController.findManyPermissionResources);

router.get("/:id", permissionResourcesController.findOnePermissionResources);

router.post(
  "/:id",
  checkValidation(permissionResourceCreateValidator),
  permissionResourcesController.createPermissionResources
);

router.patch(
  "/:id",
  checkValidation(permissionResourceUpdateValidator),
  permissionResourcesController.updateOnePermissionResources
);

router.delete(
  "/:id",
  permissionResourcesController.deleteOnePermissionResources
);

export default router;

import { Router } from "express";
import { permissionActionController } from "../../permission/controller/permission.action.controller";
import { checkValidation } from "core/helper/validation.helper";
import {
  permissionActionCreateValidator,
  permissionActionUpdateValidator,
} from "../validator/permission.action.validator";
const router = Router();

router.get("/list", permissionActionController.findMany);

router.get("/:id", permissionActionController.findOne);

router.post(
  "/:id",
  checkValidation(permissionActionCreateValidator),
  permissionActionController.createOne
);

router.patch(
  "/:id",
  checkValidation(permissionActionUpdateValidator),
  permissionActionController.updateOne
);

router.delete("/:id", permissionActionController.deleteOne);

export default router;

import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { checkValidation } from "@/core/helper/validation.helper";
import { createPermissionValidator } from "../validator/user.validator";

const router = Router({ mergeParams: true });
const userController = new UserController();

router.post('/',checkValidation(createPermissionValidator),userController.create);
router.get('/:id',userController.findOne);
router.put('/:id',userController.update);

export default router;

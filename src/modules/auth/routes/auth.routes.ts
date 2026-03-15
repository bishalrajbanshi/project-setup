import { Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { authenticateToken } from "middlewares/auth";
const router = Router({ mergeParams: true });

const autheController = new AuthController();

router.post("/login", autheController.login);
router.get("/", authenticateToken, autheController.getUser);

export default router;

import { Router } from "express";
import userRoutes from "../modules/user/routes/user.routes";
import authRoutes from "../modules/auth/routes/auth.routes";
const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;

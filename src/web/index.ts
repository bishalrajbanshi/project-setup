import { Router } from "express";
import roleRoutes from "../modules/roles/routes/roles.routes";

const router = Router();

/**
 * ROLE BASE ACCESS CONTROL
 */
router.use("/role", roleRoutes);

export default router;

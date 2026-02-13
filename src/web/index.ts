import { Router } from "express";
import roleRoutes from '@modules/role-base-access-control/role/routes/role.routes';
import permissionRoutes from '@modules/role-base-access-control/permission/routes/permission.routes';
import permissionActionRoutes from '@modules/role-base-access-control/permission/routes/permission.action.routes';

const router = Router();

/**
 * ROLE BASE ACCESS CONTROL
 */
router.use('/role', roleRoutes);
router.use('/permission', permissionRoutes);
router.use('/permission-action', permissionActionRoutes);



export default router;
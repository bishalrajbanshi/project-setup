import { Router } from "express";
import roleRoutes from '@modules/role-base-access-control/role/routes/role.routes';

const router = Router();

router.use('/role', roleRoutes);



export default router;
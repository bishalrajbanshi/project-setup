import { RequestHandler, Router } from 'express';
import { RolesController } from '../controllers/roles.controller';

const router = Router({ mergeParams: true });
const rolesController = new RolesController();


router.post('/',rolesController.createRole);
router.get('/:id',rolesController.findOne);
router.patch('/:id',rolesController.update);



export default router;

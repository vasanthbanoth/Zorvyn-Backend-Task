import { Router } from 'express';
import { getUsers, getUser, updateRole, updateStatus, deleteUser } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { updateUserRoleSchema, updateUserStatusSchema } from '../../validators/user.validator';
import { protect } from '../../middlewares/authMiddleware';
import { restrictTo } from '../../middlewares/roleMiddleware';

const router = Router();

router.use(protect);
router.use(restrictTo('ADMIN'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.patch('/:id/role', validateRequest(updateUserRoleSchema), updateRole);
router.patch('/:id/status', validateRequest(updateUserStatusSchema), updateStatus);
router.delete('/:id', deleteUser);

export default router;

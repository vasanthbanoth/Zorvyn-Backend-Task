import { Router } from 'express';
import { create, getTransactions, getTransaction, update, remove } from './transaction.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createTransactionSchema, updateTransactionSchema, getTransactionsSchema } from '../../validators/transaction.validator';
import { protect } from '../../middlewares/authMiddleware';
import { restrictTo } from '../../middlewares/roleMiddleware';

const router = Router();

router.use(protect);

router.post('/', restrictTo('ADMIN'), validateRequest(createTransactionSchema), create);
router.get('/', validateRequest(getTransactionsSchema), getTransactions);
router.get('/:id', getTransaction);
router.patch('/:id', restrictTo('ADMIN'), validateRequest(updateTransactionSchema), update);
router.delete('/:id', restrictTo('ADMIN'), remove);

export default router;

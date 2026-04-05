"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const transaction_validator_1 = require("../../validators/transaction.validator");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.protect);
router.post('/', (0, roleMiddleware_1.restrictTo)('ADMIN'), (0, validateRequest_1.validateRequest)(transaction_validator_1.createTransactionSchema), transaction_controller_1.create);
router.get('/', (0, validateRequest_1.validateRequest)(transaction_validator_1.getTransactionsSchema), transaction_controller_1.getTransactions);
router.get('/:id', transaction_controller_1.getTransaction);
router.patch('/:id', (0, roleMiddleware_1.restrictTo)('ADMIN'), (0, validateRequest_1.validateRequest)(transaction_validator_1.updateTransactionSchema), transaction_controller_1.update);
router.delete('/:id', (0, roleMiddleware_1.restrictTo)('ADMIN'), transaction_controller_1.remove);
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map
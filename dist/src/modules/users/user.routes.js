"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validator_1 = require("../../validators/user.validator");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.protect);
router.use((0, roleMiddleware_1.restrictTo)('ADMIN'));
router.get('/', user_controller_1.getUsers);
router.get('/:id', user_controller_1.getUser);
router.patch('/:id/role', (0, validateRequest_1.validateRequest)(user_validator_1.updateUserRoleSchema), user_controller_1.updateRole);
router.patch('/:id/status', (0, validateRequest_1.validateRequest)(user_validator_1.updateUserStatusSchema), user_controller_1.updateStatus);
router.delete('/:id', user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map
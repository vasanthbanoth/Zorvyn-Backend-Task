"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatusSchema = exports.updateUserRoleSchema = void 0;
const zod_1 = require("zod");
exports.updateUserRoleSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(['VIEWER', 'ANALYST', 'ADMIN']),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid user ID format'),
    }),
});
exports.updateUserStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['ACTIVE', 'INACTIVE']),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid user ID format'),
    }),
});
//# sourceMappingURL=user.validator.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsSchema = exports.updateTransactionSchema = exports.createTransactionSchema = void 0;
const zod_1 = require("zod");
exports.createTransactionSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().positive('Amount must be positive'),
        type: zod_1.z.enum(['INCOME', 'EXPENSE']),
        category: zod_1.z.string().min(1, 'Category is required'),
        date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: 'Invalid date format',
        }),
        notes: zod_1.z.string().optional(),
    }),
});
exports.updateTransactionSchema = zod_1.z.object({
    body: zod_1.z.object({
        amount: zod_1.z.number().positive('Amount must be positive').optional(),
        type: zod_1.z.enum(['INCOME', 'EXPENSE']).optional(),
        category: zod_1.z.string().min(1).optional(),
        date: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: 'Invalid date format',
        }).optional(),
        notes: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().uuid('Invalid transaction ID format'),
    }),
});
exports.getTransactionsSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
        limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
        type: zod_1.z.enum(['INCOME', 'EXPENSE']).optional(),
        category: zod_1.z.string().optional(),
        startDate: zod_1.z.string().optional(),
        endDate: zod_1.z.string().optional(),
        search: zod_1.z.string().optional(),
        sortBy: zod_1.z.enum(['date', 'amount', 'createdAt']).optional().default('date'),
        order: zod_1.z.enum(['asc', 'desc']).optional().default('desc'),
    }),
});
//# sourceMappingURL=transaction.validator.js.map
import { z } from 'zod';

export const createTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive'),
    type: z.enum(['INCOME', 'EXPENSE']),
    category: z.string().min(1, 'Category is required'),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
    notes: z.string().optional(),
  }),
});

export const updateTransactionSchema = z.object({
  body: z.object({
    amount: z.number().positive('Amount must be positive').optional(),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    category: z.string().min(1).optional(),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }).optional(),
    notes: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid('Invalid transaction ID format'),
  }),
});

export const getTransactionsSchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
    type: z.enum(['INCOME', 'EXPENSE']).optional(),
    category: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    search: z.string().optional(),
    sortBy: z.enum(['date', 'amount', 'createdAt']).optional().default('date'),
    order: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});

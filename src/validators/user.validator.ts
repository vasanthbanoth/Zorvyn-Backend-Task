import { z } from 'zod';

export const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum(['VIEWER', 'ANALYST', 'ADMIN']),
  }),
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
});

export const updateUserStatusSchema = z.object({
  body: z.object({
    status: z.enum(['ACTIVE', 'INACTIVE']),
  }),
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
});

import { Request } from 'express';

export type Role = 'VIEWER' | 'ANALYST' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE';
export type TransactionType = 'INCOME' | 'EXPENSE';

export interface JwtPayload {
  id: string;
  role: Role;
  status: UserStatus;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

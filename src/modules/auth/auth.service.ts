import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../config/database';
import { AppError } from '../../utils/AppError';
import { Role } from '../../types';

export const registerUser = async (email: string, password: string, role: Role = 'VIEWER') => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
    },
  });

  const token = signToken(user.id, user.role as Role, user.status as any);
  return { user: { id: user.id, email: user.email, role: user.role, status: user.status }, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid credentials', 401);
  }

  if (user.status === 'INACTIVE') {
    throw new AppError('Account is inactive. Contact support.', 403);
  }

  const token = signToken(user.id, user.role as Role, user.status as any);
  return { user: { id: user.id, email: user.email, role: user.role, status: user.status }, token };
};

const signToken = (id: string, role: Role, status: string) => {
  return jwt.sign({ id, role, status }, process.env.JWT_SECRET || 'secret', {
    expiresIn: (process.env.JWT_EXPIRES_IN || '24h') as any,
  });
};

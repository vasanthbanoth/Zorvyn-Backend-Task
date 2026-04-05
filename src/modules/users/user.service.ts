import prisma from '../../config/database';
import { AppError } from '../../utils/AppError';
import { Role, UserStatus } from '../../types';

export const getAllUsers = async (page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      select: { id: true, email: true, role: true, status: true, createdAt: true },
    }),
    prisma.user.count(),
  ]);

  return { users, total };
};

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true, status: true, createdAt: true },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const updateUserRole = async (id: string, role: Role) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, email: true, role: true, status: true },
  });
};

export const updateUserStatus = async (id: string, status: UserStatus) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return prisma.user.update({
    where: { id },
    data: { status },
    select: { id: true, email: true, role: true, status: true },
  });
};

export const deleteUser = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError('User not found', 404);
  }

  await prisma.user.delete({ where: { id } });
};

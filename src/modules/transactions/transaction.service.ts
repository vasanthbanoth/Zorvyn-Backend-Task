import prisma from '../../config/database';
import { AppError } from '../../utils/AppError';
import { Prisma } from '@prisma/client';

export const createTransaction = async (userId: string, data: any) => {
  return prisma.transaction.create({
    data: {
      ...data,
      date: new Date(data.date),
      userId,
    },
  });
};

export const getTransactions = async (filters: any) => {
  const { page, limit, type, category, startDate, endDate, search, sortBy, order } = filters;
  const skip = (page - 1) * limit;

  const where: Prisma.TransactionWhereInput = {
    isDeleted: false,
  };

  if (type) where.type = type;
  if (category) where.category = category;
  if (startDate && endDate) {
    where.date = {
      gte: new Date(startDate),
      lte: new Date(endDate),
    };
  } else if (startDate) {
    where.date = { gte: new Date(startDate) };
  } else if (endDate) {
    where.date = { lte: new Date(endDate) };
  }

  if (search) {
    where.OR = [
      { notes: { contains: search } },
      { category: { contains: search } },
    ];
  }

  const [transactions, total] = await Promise.all([
    prisma.transaction.findMany({
      where,
      skip,
      take: limit,
      orderBy: { [sortBy]: order },
      include: {
        user: { select: { id: true, email: true } }
      }
    }),
    prisma.transaction.count({ where }),
  ]);

  return { transactions, total };
};

export const getTransactionById = async (id: string) => {
  const transaction = await prisma.transaction.findFirst({
    where: { id, isDeleted: false },
    include: {
      user: { select: { id: true, email: true } }
    }
  });

  if (!transaction) {
    throw new AppError('Transaction not found', 404);
  }

  return transaction;
};

export const updateTransaction = async (id: string, data: any) => {
  const transaction = await prisma.transaction.findFirst({ where: { id, isDeleted: false } });
  
  if (!transaction) {
    throw new AppError('Transaction not found', 404);
  }

  const updateData = { ...data };
  if (data.date) {
    updateData.date = new Date(data.date);
  }

  return prisma.transaction.update({
    where: { id },
    data: updateData,
  });
};

export const softDeleteTransaction = async (id: string) => {
  const transaction = await prisma.transaction.findFirst({ where: { id, isDeleted: false } });
  
  if (!transaction) {
    throw new AppError('Transaction not found', 404);
  }

  await prisma.transaction.update({
    where: { id },
    data: { isDeleted: true },
  });
};

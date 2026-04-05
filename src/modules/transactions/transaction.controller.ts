import { Request, Response, NextFunction } from 'express';
import * as transactionService from './transaction.service';
import { sendResponse, sendPaginatedResponse } from '../../utils/responseHandler';
import { AuthRequest } from '../../types';

export const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const transaction = await transactionService.createTransaction(req.user!.id, req.body);
    sendResponse(res, 201, transaction, 'Transaction successfully created');
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = req.query;
    const { transactions, total } = await transactionService.getTransactions(filters);

    sendPaginatedResponse(res, 200, transactions, {
      total,
      page: filters.page as unknown as number,
      limit: filters.limit as unknown as number,
      totalPages: Math.ceil(total / (filters.limit as unknown as number)),
    }, 'Transactions successfully fetched');
  } catch (error) {
    next(error);
  }
};

export const getTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await transactionService.getTransactionById(req.params.id as string);
    sendResponse(res, 200, transaction, 'Transaction successfully fetched');
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transaction = await transactionService.updateTransaction(req.params.id as string, req.body);
    sendResponse(res, 200, transaction, 'Transaction successfully updated');
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await transactionService.softDeleteTransaction(req.params.id as string);
    sendResponse(res, 204, null, 'Transaction successfully deleted');
  } catch (error) {
    next(error);
  }
};

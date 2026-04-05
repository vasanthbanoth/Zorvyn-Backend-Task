import { Response } from 'express';

export const sendResponse = (res: Response, statusCode: number, data: any, message: string = 'Success') => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

export const sendPaginatedResponse = (
  res: Response,
  statusCode: number,
  data: any,
  meta: { total: number; page: number; limit: number; totalPages: number },
  message: string = 'Success'
) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
    meta,
  });
};

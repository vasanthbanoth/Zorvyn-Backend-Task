import { Request, Response, NextFunction } from 'express';
import * as dashboardService from './dashboard.service';
import { sendResponse } from '../../utils/responseHandler';

export const getSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await dashboardService.getSummary();
    sendResponse(res, 200, result);
  } catch (error) { next(error); }
};

export const getCategoryBreakdown = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await dashboardService.getCategoryBreakdown();
    sendResponse(res, 200, result);
  } catch (error) { next(error); }
};

export const getMonthlyTrends = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await dashboardService.getMonthlyTrends();
    sendResponse(res, 200, result);
  } catch (error) { next(error); }
};

export const getRecentActivity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await dashboardService.getRecentActivity();
    sendResponse(res, 200, result);
  } catch (error) { next(error); }
};

export const getWeeklySummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await dashboardService.getWeeklySummary();
    sendResponse(res, 200, result);
  } catch (error) { next(error); }
};

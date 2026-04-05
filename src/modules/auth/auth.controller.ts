import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';
import { sendResponse } from '../../utils/responseHandler';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.registerUser(email, password);
    sendResponse(res, 201, result, 'User registered successfully');
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    sendResponse(res, 200, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

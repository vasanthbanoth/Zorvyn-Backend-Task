import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types';
import { AppError } from '../utils/AppError';

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please log in to get access.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
    
    if (decoded.status === 'INACTIVE') {
      return next(new AppError('Your account is inactive. Please contact support.', 403));
    }

    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError('Invalid token or token has expired.', 401));
  }
};

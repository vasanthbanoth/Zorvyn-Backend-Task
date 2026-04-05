import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import { sendResponse, sendPaginatedResponse } from '../../utils/responseHandler';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { users, total } = await userService.getAllUsers(page, limit);

    sendPaginatedResponse(res, 200, users, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }, 'Users successfully fetched');
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(req.params.id as string);
    sendResponse(res, 200, user, 'User successfully fetched');
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.updateUserRole(req.params.id as string, req.body.role);
    sendResponse(res, 200, user, 'User role successfully updated');
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.updateUserStatus(req.params.id as string, req.body.status);
    sendResponse(res, 200, user, 'User status successfully updated');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userService.deleteUser(req.params.id as string);
    sendResponse(res, 204, null, 'User successfully deleted');
  } catch (error) {
    next(error);
  }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserStatus = exports.updateUserRole = exports.getUserById = exports.getAllUsers = void 0;
const database_1 = __importDefault(require("../../config/database"));
const AppError_1 = require("../../utils/AppError");
const getAllUsers = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
        database_1.default.user.findMany({
            skip,
            take: limit,
            select: { id: true, email: true, role: true, status: true, createdAt: true },
        }),
        database_1.default.user.count(),
    ]);
    return { users, total };
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    const user = await database_1.default.user.findUnique({
        where: { id },
        select: { id: true, email: true, role: true, status: true, createdAt: true },
    });
    if (!user) {
        throw new AppError_1.AppError('User not found', 404);
    }
    return user;
};
exports.getUserById = getUserById;
const updateUserRole = async (id, role) => {
    const user = await database_1.default.user.findUnique({ where: { id } });
    if (!user) {
        throw new AppError_1.AppError('User not found', 404);
    }
    return database_1.default.user.update({
        where: { id },
        data: { role },
        select: { id: true, email: true, role: true, status: true },
    });
};
exports.updateUserRole = updateUserRole;
const updateUserStatus = async (id, status) => {
    const user = await database_1.default.user.findUnique({ where: { id } });
    if (!user) {
        throw new AppError_1.AppError('User not found', 404);
    }
    return database_1.default.user.update({
        where: { id },
        data: { status },
        select: { id: true, email: true, role: true, status: true },
    });
};
exports.updateUserStatus = updateUserStatus;
const deleteUser = async (id) => {
    const user = await database_1.default.user.findUnique({ where: { id } });
    if (!user) {
        throw new AppError_1.AppError('User not found', 404);
    }
    await database_1.default.user.delete({ where: { id } });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeleteTransaction = exports.updateTransaction = exports.getTransactionById = exports.getTransactions = exports.createTransaction = void 0;
const database_1 = __importDefault(require("../../config/database"));
const AppError_1 = require("../../utils/AppError");
const createTransaction = async (userId, data) => {
    return database_1.default.transaction.create({
        data: {
            ...data,
            date: new Date(data.date),
            userId,
        },
    });
};
exports.createTransaction = createTransaction;
const getTransactions = async (filters) => {
    const { page, limit, type, category, startDate, endDate, search, sortBy, order } = filters;
    const skip = (page - 1) * limit;
    const where = {
        isDeleted: false,
    };
    if (type)
        where.type = type;
    if (category)
        where.category = category;
    if (startDate && endDate) {
        where.date = {
            gte: new Date(startDate),
            lte: new Date(endDate),
        };
    }
    else if (startDate) {
        where.date = { gte: new Date(startDate) };
    }
    else if (endDate) {
        where.date = { lte: new Date(endDate) };
    }
    if (search) {
        where.OR = [
            { notes: { contains: search } },
            { category: { contains: search } },
        ];
    }
    const [transactions, total] = await Promise.all([
        database_1.default.transaction.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: order },
            include: {
                user: { select: { id: true, email: true } }
            }
        }),
        database_1.default.transaction.count({ where }),
    ]);
    return { transactions, total };
};
exports.getTransactions = getTransactions;
const getTransactionById = async (id) => {
    const transaction = await database_1.default.transaction.findFirst({
        where: { id, isDeleted: false },
        include: {
            user: { select: { id: true, email: true } }
        }
    });
    if (!transaction) {
        throw new AppError_1.AppError('Transaction not found', 404);
    }
    return transaction;
};
exports.getTransactionById = getTransactionById;
const updateTransaction = async (id, data) => {
    const transaction = await database_1.default.transaction.findFirst({ where: { id, isDeleted: false } });
    if (!transaction) {
        throw new AppError_1.AppError('Transaction not found', 404);
    }
    const updateData = { ...data };
    if (data.date) {
        updateData.date = new Date(data.date);
    }
    return database_1.default.transaction.update({
        where: { id },
        data: updateData,
    });
};
exports.updateTransaction = updateTransaction;
const softDeleteTransaction = async (id) => {
    const transaction = await database_1.default.transaction.findFirst({ where: { id, isDeleted: false } });
    if (!transaction) {
        throw new AppError_1.AppError('Transaction not found', 404);
    }
    await database_1.default.transaction.update({
        where: { id },
        data: { isDeleted: true },
    });
};
exports.softDeleteTransaction = softDeleteTransaction;
//# sourceMappingURL=transaction.service.js.map
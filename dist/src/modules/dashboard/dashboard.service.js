"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeeklySummary = exports.getRecentActivity = exports.getMonthlyTrends = exports.getCategoryBreakdown = exports.getSummary = void 0;
const database_1 = __importDefault(require("../../config/database"));
const getSummary = async () => {
    const transactions = await database_1.default.transaction.findMany({
        where: { isDeleted: false },
        select: { amount: true, type: true }
    });
    let totalIncome = 0;
    let totalExpenses = 0;
    transactions.forEach(t => {
        if (t.type === 'INCOME')
            totalIncome += t.amount;
        if (t.type === 'EXPENSE')
            totalExpenses += t.amount;
    });
    return {
        totalIncome,
        totalExpenses,
        netBalance: totalIncome - totalExpenses,
        totalTransactions: transactions.length
    };
};
exports.getSummary = getSummary;
const getCategoryBreakdown = async () => {
    const transactions = await database_1.default.transaction.groupBy({
        by: ['category', 'type'],
        where: { isDeleted: false },
        _sum: { amount: true },
    });
    return transactions.map(t => ({
        category: t.category,
        type: t.type,
        totalAmount: t._sum.amount || 0
    }));
};
exports.getCategoryBreakdown = getCategoryBreakdown;
const getMonthlyTrends = async () => {
    // Simplistic approach for sqlite: fetch all and group in JS. 
    // In postgres, we'd use date_trunc.
    const transactions = await database_1.default.transaction.findMany({
        where: { isDeleted: false },
        select: { amount: true, type: true, date: true }
    });
    const trends = {};
    transactions.forEach(t => {
        const monthYear = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, '0')}`;
        if (!trends[monthYear]) {
            trends[monthYear] = { income: 0, expense: 0 };
        }
        if (t.type === 'INCOME')
            trends[monthYear].income += t.amount;
        if (t.type === 'EXPENSE')
            trends[monthYear].expense += t.amount;
    });
    return Object.keys(trends).sort().map(month => ({
        month,
        ...trends[month]
    }));
};
exports.getMonthlyTrends = getMonthlyTrends;
const getRecentActivity = async () => {
    return database_1.default.transaction.findMany({
        where: { isDeleted: false },
        orderBy: { date: 'desc' },
        take: 10,
        select: { id: true, amount: true, type: true, category: true, date: true, notes: true }
    });
};
exports.getRecentActivity = getRecentActivity;
const getWeeklySummary = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const transactions = await database_1.default.transaction.findMany({
        where: {
            isDeleted: false,
            date: { gte: sevenDaysAgo }
        },
        select: { amount: true, type: true }
    });
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
        if (t.type === 'INCOME')
            income += t.amount;
        if (t.type === 'EXPENSE')
            expense += t.amount;
    });
    return { income, expense };
};
exports.getWeeklySummary = getWeeklySummary;
//# sourceMappingURL=dashboard.service.js.map
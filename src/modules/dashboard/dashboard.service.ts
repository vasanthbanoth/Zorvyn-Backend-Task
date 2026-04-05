import prisma from '../../config/database';

export const getSummary = async () => {
  const transactions = await prisma.transaction.findMany({
    where: { isDeleted: false },
    select: { amount: true, type: true }
  });

  let totalIncome = 0;
  let totalExpenses = 0;
  
  transactions.forEach(t => {
    if (t.type === 'INCOME') totalIncome += t.amount;
    if (t.type === 'EXPENSE') totalExpenses += t.amount;
  });

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
    totalTransactions: transactions.length
  };
};

export const getCategoryBreakdown = async () => {
  const transactions = await prisma.transaction.groupBy({
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

export const getMonthlyTrends = async () => {
  // Simplistic approach for sqlite: fetch all and group in JS. 
  // In postgres, we'd use date_trunc.
  const transactions = await prisma.transaction.findMany({
    where: { isDeleted: false },
    select: { amount: true, type: true, date: true }
  });

  const trends: Record<string, { income: number; expense: number }> = {};

  transactions.forEach(t => {
    const monthYear = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, '0')}`;
    if (!trends[monthYear]) {
      trends[monthYear] = { income: 0, expense: 0 };
    }
    if (t.type === 'INCOME') trends[monthYear].income += t.amount;
    if (t.type === 'EXPENSE') trends[monthYear].expense += t.amount;
  });

  return Object.keys(trends).sort().map(month => ({
    month,
    ...trends[month]
  }));
};

export const getRecentActivity = async () => {
  return prisma.transaction.findMany({
    where: { isDeleted: false },
    orderBy: { date: 'desc' },
    take: 10,
    select: { id: true, amount: true, type: true, category: true, date: true, notes: true }
  });
};

export const getWeeklySummary = async () => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const transactions = await prisma.transaction.findMany({
    where: { 
      isDeleted: false,
      date: { gte: sevenDaysAgo }
    },
    select: { amount: true, type: true }
  });

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.type === 'INCOME') income += t.amount;
    if (t.type === 'EXPENSE') expense += t.amount;
  });

  return { income, expense };
};

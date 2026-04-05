import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  const password = await bcrypt.hash('password123', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@finance.com' },
    update: {},
    create: { email: 'admin@finance.com', password, role: 'ADMIN' },
  });

  const analyst = await prisma.user.upsert({
    where: { email: 'analyst@finance.com' },
    update: {},
    create: { email: 'analyst@finance.com', password, role: 'ANALYST' },
  });

  const viewer = await prisma.user.upsert({
    where: { email: 'viewer@finance.com' },
    update: {},
    create: { email: 'viewer@finance.com', password, role: 'VIEWER' },
  });

  const transactions = [];
  for (let i = 1; i <= 20; i++) {
    transactions.push({
      amount: Math.round(Math.random() * 1000) + 10,
      type: i % 2 === 0 ? 'INCOME' : 'EXPENSE',
      category: i % 2 === 0 ? 'Salary' : 'Food',
      date: new Date(),
      notes: `Mock transaction ${i}`,
      userId: admin.id,
    });
  }

  await prisma.transaction.createMany({ data: transactions });

  console.log('Seeding complete. Users and transactions created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

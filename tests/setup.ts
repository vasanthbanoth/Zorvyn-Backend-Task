import prisma from '../src/config/database';

beforeAll(async () => {
  // Clear the database or migrate
  await prisma.transaction.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

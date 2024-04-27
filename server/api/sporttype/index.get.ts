import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // const {
  //   user: { email: userEmail },
  // } = event.context;
  const result = await prisma.sportType.findMany({});
  prisma.$disconnect();
  return result;
});

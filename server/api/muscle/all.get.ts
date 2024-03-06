import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // const {
  //   user: { email: userEmail },
  // } = event.context;
prisma.$disconnect();
  return await prisma.muscle.findMany({});
});

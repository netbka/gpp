import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // const {
  //   user: { email: userEmail },
  // } = event.context;

  return await prisma.sportType.findMany({});
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const {
    user: { id: user_id },
  } = event.context;

  const result = await prisma.training.findMany({
    where: {
      user_id: user_id,
    },
    include: {
      excerciseGroup: true,
    },
  });
  prisma.$disconnect();
  return result;
});

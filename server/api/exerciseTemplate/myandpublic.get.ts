import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const {
    user: { id: user_id },
  } = event.context;
  var result = await prisma.exerciseTemplate.findMany({
    where: {
      OR: [{ user_id: user_id }, { public: true }],
    },
    include: {
      exerciseTemplateMuscle: true,
    },
  });
  prisma.$disconnect();
  return result;
});

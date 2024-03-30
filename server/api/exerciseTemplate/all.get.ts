import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    if (event.context.user === null) return [];
    const {
      user: { id: user_id },
    } = event.context;
    var result = await prisma.exerciseTemplate.findMany({
      where: {
        user_id: user_id,
      },
      include: {
        exerciseTemplateMuscle: true,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    return [];
  } finally {
    prisma.$disconnect();
  }
});

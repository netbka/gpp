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
      select: {
        id: true,
        name: true,
        level: true,
        user_id: true,
        duration: true,
        
        public: true,

        exerciseTemplateMuscle: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Что-то пошло не так",
    });
    
  } finally {
    prisma.$disconnect();
  }
});

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    const body = await readBody(event);
    const id = body.id;

    var result = await prisma.exerciseTemplate.delete({
      where: {
        id: id,
        user_id: user_id,
      },
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    const body = await readBody(event);
    //await protectRoute(event, "exercise", body.id);

    var result = await prisma.exercise.delete({
      where: {
        id: body.id,
      },
    });

    return result;
  } catch (error) {
    console.log("error on delete", error);
    throw createError({
      statusCode: error.statusCode ? error.statusCode : 500,
      message: error.message ? error.message : "Что-то пошло не так",
    });
  } finally {
    await prisma.$disconnect();
  }
});

import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    body = omit(body, ["template"]);
    //await protectRoute(event, "exercise", body.id);
    let result = await prisma.exercise.update({
      where: {
        id: body.id,
      },
      data: { ...body },
      include: {
        template: true,
      },
    });

    return result;
  } catch (error) {
    console.log("error on submit", error);
    throw createError({
      statusCode: 500,
      message: "Что-то пошло не так",
    });
  } finally {
    await prisma.$disconnect();
  }
});

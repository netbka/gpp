import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    body.user_id = user_id;

    const newItems = body.newItems ? body.newItems.map(({ id }) => id) : [];
    let removeItems = body.exerciseTemplateMuscle ? body.exerciseTemplateMuscle.map(({ id }) => id) : [];
    const itemsToRemoveSet = new Set(newItems);
    removeItems = removeItems.filter((item) => !itemsToRemoveSet.has(item));

    body = omit(body, ["id", "exerciseTemplateMuscle", "newItems"]);

    let result = await prisma.exerciseTemplate.create({
      data: {
        ...body,
        exerciseTemplateMuscle: {
          connect: newItems.map((id) => ({ id })),
          disconnect: removeItems.map((id) => ({ id })),
        },
      },
      include: {
        exerciseTemplateMuscle: true,
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

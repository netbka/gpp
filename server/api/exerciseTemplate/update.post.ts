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
    body.muscleId = body.muscle.id;
    // let muscleObj = body.muscle;
    body = omit(body, ["muscle"]);
    let result = await prisma.exerciseTemplate.update({
      where: {
        id: body.id,
      },
      data: { ...body },
      include: {
        muscle: true,
      },
    });

    //result.muscle = muscleObj;
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

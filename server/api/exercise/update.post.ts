import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);

    let result;

    if (body.id === null || body.id === 0) {
      body = omit(body, ["id"]);
      result = await prisma.exercise.create({
        data: { ...body },
      });
    } else {
      result = await prisma.exercise.update({
        where: {
          id: body.id,
        },
        data: { ...body },
      });
    }

    return result;
  } catch (error) {
    console.log("error on submit", error);
  } finally {
    await prisma.$disconnect();
  }
});

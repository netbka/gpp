import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  //event.context.params;

  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    body.user_id = user_id;

    //body = omit(body, ["muscle"]);
    let result;

    if (body.id === 0) {
      body = omit(body, ["id"]);
      result = await prisma.training.create({
        data: { ...body },
      });
    } else {
      result = await prisma.training.update({
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

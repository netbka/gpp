import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit.js";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    body.user_id = user_id;

    body = omit(body, ["exerciseGroup"]);
    let result = await prisma.training.update({
      where: {
        id: body.id,
      },
      data: { ...body },
    });

    return result;
  } catch (error) {
    console.log("error on submit", error);
  } finally {
    await prisma.$disconnect();
  }
});

import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);

    let data = {};
    data[body.field] = body[body.field];

    let result = await prisma.exerciseGroup.update({
      where: {
        id: body.id,
      },
      data: { ...data },
    });

    return result;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
});

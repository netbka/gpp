import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit.js";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);

    let data = {};
    data[body.field] = body[body.field];

    let result = await prisma.exerciseTemplate.update({
      where: {
        id: body.id,
        user_id: user_id,
      },
      data: { ...data },
      include: {
        exerciseTemplateMuscle: true,
      },
    });

    return result;
  } catch (error) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
});

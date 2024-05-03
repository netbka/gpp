import { PrismaClient } from "@prisma/client";
//import omit from "lodash/omit";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    //await protectRoute(event, "exercise", body.id);
    let data = {};
    data[body.field] = body[body.field];

    let result = await prisma.exercise.update({
      where: {
        id: body.id,
        //    user_id: user_id,
      },
      data: { ...data },
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
});

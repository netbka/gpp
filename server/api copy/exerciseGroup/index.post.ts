import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit.js";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    //await protectRoute(event, "excerciseGroup", body.id);
    body = omit(body, ["exercise", "id"]);
    let result = await prisma.exerciseGroup.create({
      data: { ...body },
      include: {
        exercise: true,
      },
    });

    return result;
  } catch (error) {
    console.log("error on submit", error);
  } finally {
    await prisma.$disconnect();
  }
});

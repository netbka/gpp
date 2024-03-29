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

    //body = omit(body, ["muscle"]);

    body = omit(body, ["id", "exerciseGroup"]);
    let result = await prisma.training.create({
      data: { ...body },
    });

    const exerciseGroupsData = [
      { name: "Разминка", repeats: 1, active: false, description: "" },
      { name: "Занятие", repeats: 1, active: false, description: "" },
      { name: "Заминка", repeats: 1, active: false, description: "" },
    ];

    result = await prisma.training.update({
      where: { id: result.id },
      data: {
        exerciseGroup: {
          create: exerciseGroupsData.map((exerciseGroup) => ({
            ...exerciseGroup,
          })),
        },
      },
      //
      include: {
        exerciseGroup: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.log("error on submit", error);
  } finally {
    await prisma.$disconnect();
  }
});

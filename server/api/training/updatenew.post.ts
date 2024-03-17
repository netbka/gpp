import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    body.user_id = user_id;

    async function updateExerciseGroups() {
      for (const parent of body.exerciseGroup) {
        // console.log(body.exerciseGroup);
        for (const el of parent.exercise) {
          await prisma.exercise.update({
            where: { id: el.id },
            data: { groupId: parent.id, name: el.name, duration: el.duration },
          });
        }
      }
    }

    // Call the updated function before updating training
    await updateExerciseGroups();

    const result = await prisma.training.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        description: body.description,
        exerciseGroup: {
          update: body.exerciseGroup.map((exerciseGroup) => ({
            where: {
              id: exerciseGroup.id,
            },
            data: {
              name: exerciseGroup.name,
              description: exerciseGroup.description,
              repeats: exerciseGroup.repeats,
            },
          })),
        },
      },
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
    throw createError({
      statusCode: 401,
      statusMessage: "Не авторизован",
    });
  } finally {
    await prisma.$disconnect();
  }
});

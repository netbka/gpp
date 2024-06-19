import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user_id = event.context.user === null ? "12345678123456781234567812345678" : event.context.user.id;
  // const {
  //   user: { id: user_id },
  // } = event.context;

  try {
    const { id } = event.context.params;
    const _id = Number(id);
    const result = await prisma.training.findUnique({
      where: {
        id: _id,
        OR: [
          {
            user_id: user_id,
          },
          { public: true },
        ],
      },
      include: {
        exerciseGroup: {
          include: {
            exercise: {
              include: {
                template: {
                  include: {
                    exerciseTemplateMuscle: true,
                    // exerciseTemplateMuscle: {
                    //   select: { id: true, name: true },
                    // },
                  },
                },
              },
              orderBy: { order_by: "asc" },
            },
          },
          orderBy: { order_by: "asc" },
        },
      },
    });
    if (result === null) {
      throw createError({
        statusCode: 500,
        message: "Нет доступа к тренировке",
      });
    } else {
      const exerciseTemplateMuscles = result.exerciseGroup.flatMap((group) => {
        if (!group.exercise) return [];

        return group.exercise.flatMap((exercise) => {
          if (!exercise.template || !exercise.template.exerciseTemplateMuscle) return [];

          return exercise.template.exerciseTemplateMuscle;
        });
      });

      const distinctExerciseTemplateMuscles = [...new Map(exerciseTemplateMuscles.map((item) => [item.id, item])).values()];

      result.exerciseTemplateMuscle = distinctExerciseTemplateMuscles;
    }
    // result.exerciseGroup.forEach((group) => {
    //   console.log(group.id, group.name, group.order_by);
    //   group.exercise.forEach((exercise) => {
    //     console.log(exercise.id, exercise.name, exercise.order_by, "groupId", exercise.groupId);
    //   });
    // });
    return result;
  } catch (error) {
    console.log("error in fetching:", error);
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  } finally {
    prisma.$disconnect();
  }
});

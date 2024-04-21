import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const user_id = event.context.user === null ? "12345678123456781234567812345678" : event.context.user.id;
    const { sortBy, descending, page, rowsPerPage, filter } = getQuery(event);

    const totalCount = await prisma.training.count({
      where: {
        OR: [{ user_id: user_id }, { public: true }],
        name: { contains: String(filter), mode: "insensitive" },
      },
    });

    const orderByObject = {};
    orderByObject[sortBy] = descending === "true" ? "desc" : "asc";

    const result = await prisma.training.findMany({
      where: {
        OR: [{ user_id: user_id }, { public: true }],
        name: { contains: String(filter), mode: "insensitive" },
      },
      skip: Number((Number(page) - 1) * Number(rowsPerPage)),
      take: Number(rowsPerPage),
      select: {
        // Limit output fields
        id: true,
        name: true,
        level: true,
        user_id: true,
        duration: true,

        public: true,

        exerciseGroup: {
          select: {
            exercise: {
              select: {
                template: {
                  select: {
                    exerciseTemplateMuscle: {
                      select: {
                        name: true,
                        id: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: orderByObject,
    });
    result.forEach((obj) => {
      if (!obj.exerciseGroup) {
        obj.exerciseTemplateMuscle = [];
        return;
      }

      const exerciseTemplateMuscles = obj.exerciseGroup.flatMap((group) => {
        if (!group.exercise) return [];

        return group.exercise.flatMap((exercise) => {
          if (!exercise.template || !exercise.template.exerciseTemplateMuscle) return [];

          return exercise.template.exerciseTemplateMuscle;
        });
      });

      const distinctExerciseTemplateMuscles = [...new Map(exerciseTemplateMuscles.map((item) => [item.id, item])).values()];

      obj.exerciseTemplateMuscle = distinctExerciseTemplateMuscles;
    });

    return { totalCount, result };
  } catch (error) {
    console.log("error", error);
    throw createError({
      statusCode: 500,
      message: "Что-то пошло не так",
    });
  } finally {
    prisma.$disconnect();
  }
});

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const user_id = event.context.user === null ? "12345678123456781234567812345678" : event.context.user.id;

    // const {
    //   user: { id: user_id },
    // } = event.context;

    const { sortBy, descending, page, rowsPerPage, filter } = getQuery(event);

    const totalCount = await prisma.exerciseTemplate.count({
      where: {
        OR: [{ user_id: user_id }, { public: true }],
        ...(filter && {
          AND: [
            {
              OR: [
                { name: { contains: filter, mode: "insensitive" } },
                {
                  exerciseTemplateMuscle: {
                    some: {
                      name: { contains: filter, mode: "insensitive" },
                    },
                  },
                },
              ],
            },
          ], //
        }),
      },
    });

    const orderByObject = {};

    orderByObject[sortBy] = descending === "true" ? "desc" : "asc";

    const result = await prisma.exerciseTemplate.findMany({
      where: {
        OR: [{ user_id: user_id }, { public: true }],
        ...(filter && {
          AND: [
            {
              OR: [
                { name: { contains: filter, mode: "insensitive" } },
                {
                  exerciseTemplateMuscle: {
                    some: {
                      name: { contains: filter, mode: "insensitive" },
                    },
                  },
                },
              ],
            },
          ], //
        }),
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

        exerciseTemplateMuscle: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      orderBy: orderByObject,
      // include: {
      //   exerciseTemplateMuscle: true,
      // },
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

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;
    const { sortBy, descending, page, rowsPerPage, rowsNumber, filter } = getQuery(event);

    const totalCount = await prisma.exerciseTemplate.count({
      where: {
        user_id: user_id,
        name: { contains: filter, mode: "insensitive" },
      },
    });

    const orderByObject = {};
    orderByObject[sortBy] = descending === "true" ? "desc" : "asc";

    const result = await prisma.exerciseTemplate.findMany({
      where: {
        user_id: user_id,
        name: { contains: filter, mode: "insensitive" },
      },
      skip: Number((page - 1) * rowsPerPage),
      take: Number(rowsPerPage),

      orderBy: orderByObject,
      include: {
        exerciseTemplateMuscle: true,
      },
    });

    return { totalCount, result };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Что-то пошло не так",
    });
  } finally {
    prisma.$disconnect();
  }
});

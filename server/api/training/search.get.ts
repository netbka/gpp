import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { sortBy, descending, page, rowsPerPage, rowsNumber, filter } = getQuery(event);

  const totalCount = await prisma.training.count({
    where: {
      public: true,
      name: { contains: String(filter), mode: "insensitive" },
    },
  });

  const orderByObject = {};
  orderByObject[sortBy] = descending === "true" ? "desc" : "asc";

  const result = await prisma.training.findMany({
    where: {
      public: true,
      name: { contains: String(filter), mode: "insensitive" },
    },
    skip: Number((Number(page) - 1) * Number(rowsPerPage)),
    take: Number(rowsPerPage),

    orderBy: orderByObject,
  });
  prisma.$disconnect();

  return { totalCount, result };
});

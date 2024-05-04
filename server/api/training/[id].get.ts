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
              orderBy: { order_by: "asc" }, // Order exercises within each group by updated_at (desc)
            },
          },
          orderBy: { order_by: "asc" },
        },
      },
    });

    // const result = await prisma.training.findUnique({
    //   where: {
    //     id: _id,
    //     OR: [
    //       {
    //         user_id: user_id,
    //       },
    //       { public: true },
    //     ],
    //   },
    //   include: {
    //     exerciseGroup: {
    //       include: {
    //         exercise: true,
    //       },
    //     },
    //   },
    // });

    return result;
  } catch (error) {
    console.log("erro in fetching:", error);
  } finally {
    prisma.$disconnect();
  }
});

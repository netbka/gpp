import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  if (!event.context.user) return null;

  const {
    user: { id: user_id },
  } = event.context;

  try {
    const { id } = event.context.params;
    const _id = Number(id);

    const result = await prisma.training.findUnique({
      where: {
        // AND: [{ id: _id }, { user_id: user_id }],
        id: _id,
        user_id: user_id,
      },
      include: {
        excerciseGroup: true,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

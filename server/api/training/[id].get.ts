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
        // AND: [{ id: _id }, { user_id: user_id }],
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
            exercise: true,
          },
        },
      },
    });
    // result.exerciseGroup.forEach((parent) => {
    //   parent.exercise.forEach((element, index) => {
    //     result.exerciseGroup[result.exerciseGroup.indexOf(parent)].exercise[index].uuid = crypto.randomUUID();
    //   });
    // });

    return result;
  } catch (error) {
    console.log(error);
  } finally {
    prisma.$disconnect();
  }
});

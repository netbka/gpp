import { PrismaClient } from "@prisma/client";
import DOMPurify from "dompurify";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user_id = event.context.user === null ? "12345678123456781234567812345678" : event.context.user.id;

  try {
    const { id } = event.context.params;
    const _id = Number(id);

    const result = await prisma.exerciseTemplate.findUnique({
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
        exerciseTemplateMuscle: true,
      },
    });

    if (result === null) {
      throw createError({
        statusCode: 404,
        message: "Нет доступа к этому занятию",
      });
    }

    return result;
  } catch (error) {
    prisma.$disconnect();
    console.log(error);
    return error;
  } finally {
    prisma.$disconnect();
  }
});

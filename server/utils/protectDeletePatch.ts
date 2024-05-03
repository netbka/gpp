import { H3Event } from "h3";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async (event: H3Event, routeAction: string, id: number) => {
  if (event.context.user.id === "12345678123456781234567812345678") {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
  let totalCount = 0;
  switch (routeAction) {
    case "training":
      totalCount = await prisma.training.count({
        where: {
          user_id: event.context.user.id,
          id: id,
        },
      });

      break;
    case "excerciseGroup":
      totalCount = await prisma.training.count({
        where: {
          user_id: event.context.user.id,
          exerciseGroup: {
            some: {
              id: id,
            },
          },
        },
      });
      break;

    case "exercise":
      totalCount = await prisma.training.count({
        where: {
          user_id: event.context.user.id,
          exerciseGroup: {
            some: {
              exercise: {
                some: {
                  id: id,
                },
              },
            },
          },
        },
      });

      break;
    default:
  }
  if (totalCount !== 1) {
    throw createError({
      statusCode: 400,
      message: "Wrong identifier",
    });
  }
};

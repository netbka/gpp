import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from "@prisma/client";
import { H3Event } from "h3";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  let user = await serverSupabaseUser(event);

  if (user) {
    event.context.user = user;
  } else {
    event.context.user = {};
    event.context.user.id = "12345678123456781234567812345678";
  }

  //event.context.user = user;
  //console.log(getRequestURL(event));
  try {
    const url = event.node.req.url;
    const method = event.node.req?.method;

    switch (method) {
      case "PATCH":
        await protectPutPatchDelete(url.split("/").slice(-1)[0].toLowerCase(), event, event.context.user.id);
        break;
      case "PUT":
        await protectPutPatchDelete(url.split("/").slice(-1)[0].toLowerCase(), event, event.context.user.id);
        break;
      case "DELETE":
        await protectPutPatchDelete(url.split("/").slice(-1)[0].toLowerCase(), event, event.context.user.id);
        break;
      case "POST":
        await protectPost(url.split("/").slice(-1)[0].toLowerCase(), event, event.context.user.id);
        break;
    }
  } catch (err) {
    console.log(err);
    throw createError({
      statusCode: err.statusCode,
      message: err.message,
    });
  } finally {
    await prisma.$disconnect();
  }
});

async function protectPost(action: string, event: H3Event, user_id: string) {
  let totalCount = 0;
  const body = await readBody(event);
  const trainingId = body.trainingId;
  const groupId = body.groupId;

  try {
    switch (action) {
      case "exercisegroup":
        isAuthenticated(user_id);
        totalCount = await prisma.training.count({
          where: {
            user_id: user_id,
            id: trainingId,
          },
        });

        checkFound(totalCount);
        break;

      case "exercise":
        isAuthenticated(user_id);
        totalCount = await prisma.training.count({
          where: {
            user_id: user_id,
            exerciseGroup: {
              some: {
                id: groupId,
              },
            },
          },
        });
        checkFound(totalCount);
        break;
      default:
    }
  } catch (err) {
    throw createError({
      statusCode: err.statusCode,
      message: err.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}

async function protectPutPatchDelete(action: string, event: H3Event, user_id: string) {
  let totalCount = 0;
  const body = await readBody(event);
  const id = body.id;

  try {
    switch (action) {
      case "exercisegroup":
        isAuthenticated(user_id);
        totalCount = await prisma.training.count({
          where: {
            user_id: user_id,
            exerciseGroup: {
              some: {
                id: id,
              },
            },
          },
        });
        checkFound(totalCount);
        break;

      case "exercise":
        isAuthenticated(user_id);
        totalCount = await prisma.training.count({
          where: {
            user_id: user_id,
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
        checkFound(totalCount);
        break;
      default:
    }
  } catch (err) {
    throw createError({
      statusCode: err.statusCode,
      message: err.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}
function checkFound(count: number) {
  if (count !== 1) {
    throw createError({
      statusCode: 400,
      message: "Wrong identifier",
    });
  }
}
function isAuthenticated(user_id: string) {
  if (user_id === "12345678123456781234567812345678") {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
}

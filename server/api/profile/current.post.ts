import { PrismaClient } from "@prisma/client";
import omit from "lodash/omit";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);

    const newItems = body.newItems ? body.newItems.map(({ id }) => id) : [];
    let removeItems = body.profilesSportType ? body.profilesSportType.map(({ id }) => id) : [];
    const itemsToRemoveSet = new Set(newItems);
    removeItems = removeItems.filter((item) => !itemsToRemoveSet.has(item));

    body = omit(body, ["user_id", "id", "profilesSportType", "newItems"]);
    //console.log(body);

    const result = await prisma.profile.update({
      where: {
        user_id: user_id,
      },
      data: {
        ...body,
        profilesSportType: {
          connect: newItems.map((id) => ({ id })),
          disconnect: removeItems.map((id) => ({ id })),
        },
      },
      include: {
        profilesSportType: true,
      },
    });
    return result;
  } catch (error) {
    // throw createError({
    //   statusCode: 500,
    //   statusMessage: "Something bad happened on the server",
    // });
    console.log("error on submit", error);
  } finally {
    await prisma.$disconnect();
  }
});

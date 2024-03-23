import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// const parserUserId = (event) => {
//   try {
//     const {
//       user: { id: user_id },
//     } = event.context;
//     return user_id;
//   } catch (error) {
//     return null;
//   }
// };

export default defineEventHandler(async (event) => {
  // if (parserUserId(event) === null) {
  //   console.log("not parsed");
  //   return;
  // }

  //const user_id = parserUserId(event);
  //if (event.context.user === null) return null;
  try {
    const {
      user: { id: user_id },
    } = event.context;

    var result = await prisma.profile.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        profilesSportType: true,
      },
    });
    var model = { firstName: user_id.split("-")[0], lastName: user_id.split("-")[1], user_id: user_id };
    if (result === null) {
      var fullName = event.context.user.user_metadata.name.split(" ");

      if (fullName.length > 0) {
        model.firstName = fullName[0];
        if (fullName.length > 1) {
          model.lastName = fullName[1];
        }
      }

      result = await prisma.profile.create({
        data: model,
        include: {
          profilesSportType: true,
        },
      });
    }
  } catch (error) {
    console.log("error from server", error);
    return null;
  } finally {
    prisma.$disconnect();
    return result;
  }
});

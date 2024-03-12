import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
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
    try {
      var fullName = event.context.user.user_metadata.name.split(" ");

      if (fullName.length > 0) {
        model.firstName = fullName[0];
        if (fullName.length > 1) {
          model.lastName = fullName[1];
        }
      }
    } catch (error) {}

    result = await prisma.profile.create({
      data: model,
    });
  }
  prisma.$disconnect();
  return result;
});

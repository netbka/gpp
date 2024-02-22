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
      speciality: true,
      profilesMedicalSubSpecialities: true,
    },
  });
  ///console.log(event.context.user.user_metadata.name);
  if (result === null) {
    var fullName = event.context.user.user_metadata.name.split(" ");

    var model = { firstName: "", lastName: "", user_id: user_id };
    if (fullName.length > 0) {
      model.firstName = fullName[0];
      if (fullName.length > 1) {
        model.lastName = fullName[1];
      }
    }
    result = await prisma.profile.create({
      data: model,
    });
  }

  return result;
});

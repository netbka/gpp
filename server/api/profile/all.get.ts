import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  var result = await prisma.profile.findMany({
    // include: {
    //   speciality: true,
    //   profilesMedicalSubSpecialities: true,
    // },
  });

  return result;
});

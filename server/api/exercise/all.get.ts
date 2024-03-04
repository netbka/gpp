import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const {
    user: { id: user_id },
  } = event.context;
  var result = await prisma.exercise.findMany({
    where: {
      user_id: user_id,
    },
    include: {
      muscle: true,
      //  profilesMedicalSubSpecialities: true,
    },
  });

  return result;
});

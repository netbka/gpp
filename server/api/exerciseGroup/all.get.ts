import { ExerciseGroup } from "./../../../types/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let body = await readBody(event);
  var result = await prisma.exerciseGroup.findMany({
    where: {
      trainingId: body.trainingId,
    },
    include: {
      exercise: true,
      //  profilesMedicalSubSpecialities: true,
    },
  });
  prisma.$disconnect();
  return result;
});

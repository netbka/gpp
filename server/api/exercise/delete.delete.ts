import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const {
    user: { id: user_id },
  } = event.context;
  const body = await readBody(event);
  const id = body.id;

  var result = await prisma.exercise.delete({
    where: {
      id: id,
    },
  });
  prisma.$disconnect();
  //  console.log(result);
  return result;
});

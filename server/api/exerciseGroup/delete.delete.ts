import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;

  var result = await prisma.exerciseGroup.delete({
    where: {
      id: id,
    },
  });
  prisma.$disconnect();
  //  console.log(result);
  return result;
});

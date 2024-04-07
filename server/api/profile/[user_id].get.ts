import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  let { user_id } = event.context.params;
  user_id = user_id.substring(0, 36);
  var result = await prisma.profile.findUnique({
    where: {
      user_id: user_id,
    },
  });
  prisma.$disconnect();
  return result;
});

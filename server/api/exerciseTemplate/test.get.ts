// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default defineEventHandler(async (event) => {
//   const {
//     user: { id: user_id },
//   } = event.context;
//   var result = await prisma.exerciseTemplate.findMany({
//     include: {
//       muscle: true,
//       //  profilesMedicalSubSpecialities: true,
//     },
//   });
//   console.log(user_id);
//   prisma.$disconnect();
//   return result;
// });

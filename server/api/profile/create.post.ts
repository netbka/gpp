// import { PrismaClient } from "@prisma/client";
// import omit from "lodash/omit";
// const prisma = new PrismaClient();

// export default defineEventHandler(async (event) => {
//   try {
//     const {
//       user: { id: user_id },
//     } = event.context;

//     let body = await readBody(event);

//     const newItems = body.newItems ? body.newItems.map(({ id }) => id) : [];
//     let removeItems = body.profilesSportType ? body.profilesSportType.map(({ id }) => id) : [];
//     const itemsToRemoveSet = new Set(newItems);
//     removeItems = removeItems.filter((item) => !itemsToRemoveSet.has(item));

//     body = omit(body, ["user_id", "id", "profilesSportType", "newItems"]);
//     //console.log(body);

//     const rresult = await prisma.profile.create({
//       data: model,
//       include: {
//         profilesSportType: true,
//       },
//     });

//     return result;
//   } catch (error) {
//     // throw createError({
//     //   statusCode: 500,
//     //   message: "Something bad happened on the server",
//     // });
//     console.log("error on submit", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// });

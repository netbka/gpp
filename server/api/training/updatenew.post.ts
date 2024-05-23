import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { createClient } from "@supabase/supabase-js";
import { useRuntimeConfig } from "#imports";
export default defineEventHandler(async (event) => {
  const supabaseUrl = useRuntimeConfig().public.supabase.url;
  const supabaseKey = useRuntimeConfig().public.supabase.key;
  const supabase = createClient(supabaseUrl, supabaseKey);
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    body.user_id = user_id;

    const { data, error } = await supabase.rpc("update_training", { training_data: body });

    // if (error) {
    //   throw error;
    // }
    // async function updateExerciseGroups() {
    //   for (const parent of body.exerciseGroup) {
    //     // console.log(body.exerciseGroup);
    //     for (const el of parent.exercise) {
    //       await prisma.exercise.update({
    //         where: { id: el.id },
    //         data: { groupId: parent.id, name: el.name, duration: el.duration },
    //       });
    //     }
    //   }
    // }

    // await updateExerciseGroups();

    // const result = await prisma.training.update({
    //   where: {
    //     id: body.id,
    //   },
    //   data: {
    //     name: body.name,
    //     description: body.description,
    //     exerciseGroup: {
    //       update: body.exerciseGroup.map((exerciseGroup) => ({
    //         where: {
    //           id: exerciseGroup.id,
    //         },
    //         data: {
    //           name: exerciseGroup.name,
    //           description: exerciseGroup.description,
    //           repeats: exerciseGroup.repeats,
    //         },
    //       })),
    //     },
    //   },
    //   include: {
    //     exerciseGroup: {
    //       include: {
    //         exercise: true,
    //       },
    //     },
    //   },
    // });

    // return result;
  } catch (error) {
    console.log("error on submit", error);
    throw createError({
      statusCode: 401,
      message: error,
    });
  } finally {
    await prisma.$disconnect();
  }
});

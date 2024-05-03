import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    let training_id = Number(body.id);

    let result = await prisma.training.findUnique({
      where: {
        id: training_id,
      },
    });

    //protect from id injection
    if (result === null || result.public === false) {
      throw createError({
        statusCode: 500,
        message: "Что-то пошло не так",
      });
    }

    const { data, error } = await supabase.rpc("clone_training", {
      training_id,
      user_id: user_id,
    });
    if (error) {
      throw error;
    }

    result = await prisma.training.findUnique({
      where: {
        id: data.id,
      },
      include: {
        exerciseGroup: {
          include: {
            exercise: true,
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.log("error on clone", error);
    throw createError({
      statusCode: 500,
      message: "Что-то пошло не так",
    });
  } finally {
    await prisma.$disconnect();
  }
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const {
      user: { id: user_id },
    } = event.context;

    let body = await readBody(event);
    body.user_id = user_id;

    const currentTraining = await prisma.training.findUnique({
      where: {
        id: body.id,
      },
      include: {
        excerciseGroup: {
          include: {
            exercise: true,
          },
        },
      },
    });
    const exerciseGroupUpdates = body.excerciseGroup.map((updatedGroup) => {
      const currentGroup = currentTraining.excerciseGroup.find((group) => group.id === updatedGroup.id);

      // Remove the deleted exercises from the group
      const exercisesToKeep = currentGroup.exercise.filter((exercise) => updatedGroup.exercise.some((updatedExercise) => updatedExercise.id === exercise.id));

      // Update the group data
      return {
        where: {
          id: updatedGroup.id,
        },
        data: {
          name: updatedGroup.name,
          description: updatedGroup.description,
          repeats: updatedGroup.repeats,
          active: updatedGroup.active,
          exercise: {
            set: exercisesToKeep.map((exercise) => ({ id: exercise.id })),
          },
        },
      };
    });

    // Find the removed ExerciseGroups and mark them for deletion
    const exerciseGroupsToDelete = currentTraining.excerciseGroup.filter((group) => !body.excerciseGroup.some((updatedGroup) => updatedGroup.id === group.id));

    // Update the Training and remaining ExerciseGroups
    const updatedTraining = await prisma.training.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        description: body.description,
        user_auth_info: {
          connect: {
            id: body.user_id,
          },
        },
        excerciseGroup: {
          update: exerciseGroupUpdates,
          deleteMany: {
            id: {
              in: exerciseGroupsToDelete.map((group) => group.id),
            },
          },
        },
      },
      include: {
        user_auth_info: true,
        excerciseGroup: {
          include: {
            exercise: true,
          },
        },
      },
    });

    // Find exercises that are not related to any other ExerciseGroup and mark them for deletion
    const exercisesToDelete = currentTraining.excerciseGroup.flatMap((group) => group.exercise.filter((exercise) => !updatedTraining.excerciseGroup.some((updatedGroup) => updatedGroup.exercise.some((updatedExercise) => updatedExercise.id === exercise.id))));

    // Delete the unrelated exercises
    await prisma.exercise.deleteMany({
      where: {
        id: {
          in: exercisesToDelete.map((exercise) => exercise.id),
        },
      },
    });

    // const result = await prisma.training.update({
    //   where: {
    //     id: body.id,
    //   },
    //   data: {
    //     name: body.name,
    //     description: body.description,

    //     excerciseGroup: {
    //       update: body.excerciseGroup.map((exerciseGroup) => ({
    //         where: {
    //           id: exerciseGroup.id,
    //         },
    //         data: {
    //           name: exerciseGroup.name,
    //           description: exerciseGroup.description,
    //           repeats: exerciseGroup.repeats,

    //           exercise: {
    //             connect: exerciseGroup.exercise.map((exercise) => ({
    //               id: exercise.id,
    //             })),
    //           },
    //         },
    //       })),
    //     },
    //   },
    //   include: {
    //     excerciseGroup: {
    //       include: {
    //         exercise: true,
    //       },
    //     },
    //   },
    // });

    //

    return updatedTraining;
  } catch (error) {
    console.log("error on submit", error);
  } finally {
    await prisma.$disconnect();
  }
});

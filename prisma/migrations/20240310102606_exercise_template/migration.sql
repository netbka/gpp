/*
  Warnings:

  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseGroupExercise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_muscleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ExerciseGroupExercise" DROP CONSTRAINT "_ExerciseGroupExercise_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ExerciseGroupExercise" DROP CONSTRAINT "_ExerciseGroupExercise_B_fkey";

-- DropTable
DROP TABLE "public"."Exercise";

-- DropTable
DROP TABLE "public"."_ExerciseGroupExercise";

-- CreateTable
CREATE TABLE "public"."ExerciseTemplate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "weight" INTEGER,
    "user_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "muscleId" INTEGER NOT NULL,
    "public" BOOLEAN NOT NULL,

    CONSTRAINT "ExerciseTemplate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ExerciseTemplate" ADD CONSTRAINT "ExerciseTemplate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ExerciseTemplate" ADD CONSTRAINT "ExerciseTemplate_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "public"."Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

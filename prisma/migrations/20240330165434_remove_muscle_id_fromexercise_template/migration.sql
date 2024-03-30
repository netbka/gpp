/*
  Warnings:

  - You are about to drop the column `muscleId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `muscleId` on the `ExerciseTemplate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_muscleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ExerciseTemplate" DROP CONSTRAINT "ExerciseTemplate_muscleId_fkey";

-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "muscleId";

-- AlterTable
ALTER TABLE "public"."ExerciseTemplate" DROP COLUMN "muscleId";

-- CreateTable
CREATE TABLE "public"."_exerciseTemplateMuscle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_exerciseTemplateMuscle_AB_unique" ON "public"."_exerciseTemplateMuscle"("A", "B");

-- CreateIndex
CREATE INDEX "_exerciseTemplateMuscle_B_index" ON "public"."_exerciseTemplateMuscle"("B");

-- AddForeignKey
ALTER TABLE "public"."_exerciseTemplateMuscle" ADD CONSTRAINT "_exerciseTemplateMuscle_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."ExerciseTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_exerciseTemplateMuscle" ADD CONSTRAINT "_exerciseTemplateMuscle_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Muscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

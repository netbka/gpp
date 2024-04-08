/*
  Warnings:

  - You are about to drop the column `descriptionShot` on the `ExerciseTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionShot` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ExerciseTemplate" DROP COLUMN "descriptionShot",
ADD COLUMN     "descriptionShort" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "public"."Training" DROP COLUMN "descriptionShot",
ADD COLUMN     "descriptionShort" TEXT NOT NULL DEFAULT '';

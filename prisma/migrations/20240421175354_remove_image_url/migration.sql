/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `ExerciseTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Exercise" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "public"."ExerciseTemplate" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "public"."Training" DROP COLUMN "imageUrl";

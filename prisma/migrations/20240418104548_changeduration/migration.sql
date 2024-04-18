/*
  Warnings:

  - You are about to drop the column `totalDuration` on the `Training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Training" DROP COLUMN "totalDuration",
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0;

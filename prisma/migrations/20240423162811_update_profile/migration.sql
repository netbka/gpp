/*
  Warnings:

  - You are about to drop the column `avatarPath` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "avatarPath",
DROP COLUMN "nickname",
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

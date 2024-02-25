/*
  Warnings:

  - You are about to drop the column `biography` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "biography",
DROP COLUMN "city",
ADD COLUMN     "nickname" TEXT;

-- CreateTable
CREATE TABLE "public"."SportType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SportType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ProfileSportType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileSportType_AB_unique" ON "public"."_ProfileSportType"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileSportType_B_index" ON "public"."_ProfileSportType"("B");

-- AddForeignKey
ALTER TABLE "public"."_ProfileSportType" ADD CONSTRAINT "_ProfileSportType_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProfileSportType" ADD CONSTRAINT "_ProfileSportType_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."SportType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

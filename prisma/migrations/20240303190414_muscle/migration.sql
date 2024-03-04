/*
  Warnings:

  - Added the required column `muscleId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Exercise" ADD COLUMN     "muscleId" INTEGER NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "public"."Muscle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Exercise" ADD CONSTRAINT "Exercise_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "public"."Muscle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Exercise" ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_user_id_key" ON "public"."Exercise"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Exercise" ADD CONSTRAINT "Exercise_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

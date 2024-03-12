-- DropForeignKey
ALTER TABLE "public"."ExerciseGroup" DROP CONSTRAINT "ExerciseGroup_trainingId_fkey";

-- AddForeignKey
ALTER TABLE "public"."ExerciseGroup" ADD CONSTRAINT "ExerciseGroup_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "public"."Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;

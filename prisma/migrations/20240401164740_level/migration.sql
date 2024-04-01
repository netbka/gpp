-- AlterTable
ALTER TABLE "public"."ExerciseTemplate" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Training" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Exercise" ADD COLUMN     "order_by" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."ExerciseGroup" ADD COLUMN     "order_by" INTEGER NOT NULL DEFAULT 0;

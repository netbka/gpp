-- CreateTable
CREATE TABLE "public"."Training" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ExerciseGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repeats" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExerciseGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "weight" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_ExerciseGroupExercise" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Training_user_id_key" ON "public"."Training"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseGroupExercise_AB_unique" ON "public"."_ExerciseGroupExercise"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseGroupExercise_B_index" ON "public"."_ExerciseGroupExercise"("B");

-- AddForeignKey
ALTER TABLE "public"."Training" ADD CONSTRAINT "Training_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."ExerciseGroup" ADD CONSTRAINT "ExerciseGroup_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "public"."Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ExerciseGroupExercise" ADD CONSTRAINT "_ExerciseGroupExercise_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ExerciseGroupExercise" ADD CONSTRAINT "_ExerciseGroupExercise_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ExerciseGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

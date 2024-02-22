-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" SERIAL NOT NULL,
    "userEmail" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "biography" TEXT,
    "birthDay" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedicalSpeciality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalSpeciality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedicalSubSpeciality" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "medicalSpecialityId" INTEGER NOT NULL,

    CONSTRAINT "MedicalSubSpeciality_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userEmail_key" ON "public"."Profile"("userEmail");

-- AddForeignKey
ALTER TABLE "public"."MedicalSubSpeciality" ADD CONSTRAINT "MedicalSubSpeciality_medicalSpecialityId_fkey" FOREIGN KEY ("medicalSpecialityId") REFERENCES "public"."MedicalSpeciality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

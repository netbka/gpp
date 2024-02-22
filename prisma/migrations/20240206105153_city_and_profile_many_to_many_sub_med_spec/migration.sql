-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "city" TEXT,
ADD COLUMN     "specialityId" INTEGER;

-- CreateTable
CREATE TABLE "public"."_ProfileMedicalSubSpecialities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileMedicalSubSpecialities_AB_unique" ON "public"."_ProfileMedicalSubSpecialities"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileMedicalSubSpecialities_B_index" ON "public"."_ProfileMedicalSubSpecialities"("B");

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_specialityId_fkey" FOREIGN KEY ("specialityId") REFERENCES "public"."MedicalSpeciality"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProfileMedicalSubSpecialities" ADD CONSTRAINT "_ProfileMedicalSubSpecialities_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."MedicalSubSpeciality"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ProfileMedicalSubSpecialities" ADD CONSTRAINT "_ProfileMedicalSubSpecialities_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

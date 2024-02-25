import type { PrismaClient, Profile as PrismaProfile, SportType as PrismaSportType } from "@prisma/client";

export type Profile = PrismaProfile;
export type SportType = PrismaSportType;
// export type MedicalSpeciality = MedicalSpecialityProfile;
// export type MedicalSubSpeciality = MedicalSubSpecialityProfile;

export interface Exercise {
  id: String;
  name: String;
  description: String;
  duration: Number;
}

export interface ExerciseGroup {
  id: String;
  name: String;
  exercise: Exercise[];
  rest: Number;
  repeats: Number;
}

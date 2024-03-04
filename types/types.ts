import type { PrismaClient, Muscle as PrismaMuscle, Profile as PrismaProfile, SportType as PrismaSportType, Training as PrismaTraining, ExerciseGroup as PrismaExerciseGroup, Exercise as PrismaExercise } from "@prisma/client";

export type Profile = PrismaProfile;
export type SportType = PrismaSportType;
export type Training = PrismaTraining;
export type ExerciseGroup = PrismaExerciseGroup;
export type Exercise = PrismaExercise;
export type Muscle = PrismaMuscle;
// export type MedicalSpeciality = MedicalSpecialityProfile;
// export type MedicalSubSpeciality = MedicalSubSpecialityProfile;

// export interface Exercise {
//   id: String;
//   name: String;
//   description: String;
//   duration: Number;
//   active: Boolean;
// }

// export interface ExerciseGroup {
//   id: String;
//   name: String;
//   exercise: Exercise[];
//   //rest: Number;
//   repeats: Number;
//   active: Boolean;
// }

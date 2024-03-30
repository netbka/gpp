import type { PrismaClient, 
    TrainingTrack as PrismaTrainingTrack, 
    Muscle as PrismaMuscle, 
    Profile as PrismaProfile, SportType as PrismaSportType, Training as PrismaTraining,
     ExerciseGroup as PrismaExerciseGroup, 
     ExerciseTemplate as PrismaExerciseTemplate, Exercise as PrismaExercise } from "@prisma/client";

export type Profile = PrismaProfile;
export type SportType = PrismaSportType;
export type Training = PrismaTraining;
export type ExerciseGroup = PrismaExerciseGroup;
export type ExerciseTemplate = PrismaExerciseTemplate;
export type Exercise = PrismaExercise;
export type Muscle = PrismaMuscle;
export type TrainingTrack = PrismaTrainingTrack;

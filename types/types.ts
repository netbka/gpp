import type { PrismaClient, TrainingTrack as PrismaTrainingTrack, Muscle as PrismaMuscle, Profile as PrismaProfile, SportType as PrismaSportType, Training as PrismaTraining, ExerciseGroup as PrismaExerciseGroup, ExerciseTemplate as PrismaExerciseTemplate, Exercise as PrismaExercise } from "@prisma/client";

//import { TablePagination as TablePaginationImport, type ITablePagination as ITablePaginationImport } from "./ITablePagination";

//export type Profile = PrismaProfile;
//export type SportType = PrismaSportType;
//export type Training = PrismaTraining;
//export type ExerciseGroup = PrismaExerciseGroup;
//export type ExerciseTemplate = PrismaExerciseTemplate;
//export type Exercise = PrismaExercise;
//export type Muscle = PrismaMuscle;
//export type TrainingTrack = PrismaTrainingTrack;

export * from "./base";
export * from "./profile";
export * from "./exerciseTemplate";
export * from "./tablePagination";
export * from "./slug";
export * from "./training";
export * from "./exerciseGroup";
export * from "./exercise";
export * from "./sportType";
export * from "./muscle";

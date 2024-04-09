import type { PrismaClient, TrainingTrack as PrismaTrainingTrack, Muscle as PrismaMuscle, Profile as PrismaProfile, SportType as PrismaSportType, Training as PrismaTraining, ExerciseGroup as PrismaExerciseGroup, ExerciseTemplate as PrismaExerciseTemplate, Exercise as PrismaExercise } from "@prisma/client";

export type Profile = PrismaProfile;
export type SportType = PrismaSportType;
export type Training = PrismaTraining;
export type ExerciseGroup = PrismaExerciseGroup;
export type ExerciseTemplate = PrismaExerciseTemplate;
export type Exercise = PrismaExercise;
export type Muscle = PrismaMuscle;
export type TrainingTrack = PrismaTrainingTrack;

export interface ITablePagination {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
}

export class TablePagination implements ITablePagination {
  public sortBy = "name";
  public descending = false;
  public page = 1;
  public rowsPerPage = 12;
  public rowsNumber = 1;
  constructor(sortBy?: string, descending?: boolean, page?: number, rowsPerPage?: number, rowsNumber?: number) {
    this.sortBy = sortBy ?? "name";
    this.descending = descending ?? false;
    this.page = page ?? 1;
    this.rowsPerPage = rowsPerPage ?? 12;
    this.rowsNumber = rowsNumber ?? 1;
  }
  public updateRowsNumber(rowsNumber: number) {
    this.rowsNumber = rowsNumber;
  }
  public updateValues(values: ITablePagination) {
    this.sortBy = values.sortBy;
    this.descending = values.descending;
    this.page = values.page;
    this.rowsPerPage = values.rowsPerPage;
    this.rowsNumber = values.rowsNumber;
  }
  public getAll() {
    return {
      sortBy: this.sortBy,
      descending: this.descending,
      page: this.page,
      rowsPerPage: this.rowsPerPage,
      rowsNumber: this.rowsNumber,
    };
  }
}

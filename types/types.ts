import type { PrismaClient, TrainingTrack as PrismaTrainingTrack, Muscle as PrismaMuscle, Profile as PrismaProfile, SportType as PrismaSportType, Training as PrismaTraining, ExerciseGroup as PrismaExerciseGroup, ExerciseTemplate as PrismaExerciseTemplate, Exercise as PrismaExercise } from "@prisma/client";

//import { TablePagination as TablePaginationImport, type ITablePagination as ITablePaginationImport } from "./ITablePagination";

export type Profile = PrismaProfile;
export type SportType = PrismaSportType;
export type Training = PrismaTraining;
export type ExerciseGroup = PrismaExerciseGroup;
//export type ExerciseTemplate = PrismaExerciseTemplate;
export type Exercise = PrismaExercise;
export type Muscle = PrismaMuscle;
export type TrainingTrack = PrismaTrainingTrack;

export interface IIdName {
  id?: number | null;
  name: string;
  //getAll(): any;
}

export abstract class BaseIdName implements IIdName {
  id?: number | null;
  name: string;
  constructor(name?: string) {
    this.name = name ?? "";
    this.id = null;
  }
  public abstract getAll(): {};
}

export interface IExerciseTemplate extends IIdName {
  level: number;

  description: string;
  descriptionShort: string;
  duration: number;
  active: boolean;
  imageUrl: string;
  weight: number;
  public: boolean;
  exerciseTemplateMuscle: Array<Muscle>;
}

export class ExerciseTemplate extends BaseIdName implements IExerciseTemplate {
  public level = 1;
  //public id?: number | null = null;
  //public name = "";
  public description = "";
  public descriptionShort = "";
  public duration = 30;
  public active = false;
  public imageUrl = "";
  public weight = 0;
  public public = false;
  // public createdAt = new Date();
  // public updatedAt = new Date();
  public exerciseTemplateMuscle = [];
  constructor(name?: string) {
    super(name);
    //this.id = null;
    //this.name = name ?? "";
    this.level = 1;
    this.description = "";
    this.descriptionShort = "";
    this.duration = 30;
    this.active = false;
    this.imageUrl = "";
    this.weight = 0;
    this.public = false;
    this.exerciseTemplateMuscle = [];
  }

  public getAll() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      description: this.description,
      descriptionShort: this.descriptionShort,
      duration: this.duration,
      active: this.active,
      imageUrl: this.imageUrl,
      weight: this.weight,
      public: this.public,
      exerciseTemplateMuscle: this.exerciseTemplateMuscle,
    };
  }
}

import { IdName, type IIdName, type IExercise, Exercise } from "./types";
export interface IExerciseGroup extends IIdName {
  description: string;
  repeats: number;
  active: boolean;
  trainingId: number;
  exercise: IExercise[];
}

export class ExerciseGroup extends IdName implements IExerciseGroup {
  public description: string;
  public repeats: number;
  public active: boolean;
  public trainingId: number;
  public exercise: IExercise[];
  constructor(name: string = "Группа №", itemCount?: number, trainingId?: number) {
    var num = itemCount ? itemCount.toString() : "1";
    super(name + num);
    this.description = "";
    this.repeats = 1;
    this.active = false;
    this.trainingId = trainingId ? trainingId : 0;
    this.exercise = [];
  }
  public trainingDefaults() {}

  public getAll() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      repeats: this.repeats,
      active: this.active,
      trainingId: this.trainingId,
      exercise: this.exercise,
    };
  }
}

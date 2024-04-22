import { template } from "./../composables/useBasicCrud copy";
import { Base, type IBase, type IExerciseGroup, ExerciseGroup, type IExerciseTemplate, ExerciseTemplate } from "./types";
export interface IExercise extends IBase {
  active: boolean;
  weight: number;
  groupId: number;
  templateId?: number | null;
  //group: IExerciseGroup;
  template?: IExerciseTemplate | null;
}

export class Exercise extends Base implements IExercise {
  public active: boolean;
  public weight: number;
  public groupId: number;
  public templateId?: number | null;

  public template: IExerciseTemplate | null;
  constructor(name?: string, groupId?: number) {
    super(name);

    this.active = false;
    this.weight = 0;
    this.groupId = groupId ? groupId : 0;
    this.templateId = null;
    //this.group = {};
    this.template = null; //new ExerciseTemplate("").getAll();
  }
  public cloneExercise(exerciseToClone: IExercise, name: string): IExercise {
    this.id = exerciseToClone.id;
    this.name = name;
    this.active = false;
    this.weight = exerciseToClone.weight;
    this.groupId = exerciseToClone.groupId;
    this.templateId = exerciseToClone.templateId;
    this.level = exerciseToClone.level;
    this.duration = exerciseToClone.duration;
    return this.getAll();
  }
  public cloneTemplate(template: IExerciseTemplate, exercise: IExercise): IExercise {
    this.id = exercise.id;
    this.name = template.name;
    this.active = false;
    this.weight = template.weight;
    this.groupId = exercise.groupId;
    this.templateId = Number(template.id);
    this.level = template.level;
    this.duration = template.duration;
    return this.getAll();
  }
  public getAll() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      level: this.level,
      duration: this.duration,

      active: this.active,
      weight: this.weight,
      groupId: this.groupId,
      templateId: this.templateId,

      template: this.template,
    };
  }
}

import { Base, type IBase, type IExerciseGroup, ExerciseGroup, type IExerciseTemplate, ExerciseTemplate } from "./types";
export interface IExercise extends IBase {
  active: boolean;
  weight: number;
  groupId: number;
  templateId: number;
  //group: IExerciseGroup;
  template: IExerciseTemplate;
}

export class Exercise extends Base implements IExercise {
  public active: boolean;
  public weight: number;
  public groupId: number;
  public templateId: number;

  public template: IExerciseTemplate;
  constructor(name?: string) {
    super(name);

    this.active = false;
    this.weight = 0;
    this.groupId = 0;
    this.templateId = 0;
    //this.group = {};
    this.template = new ExerciseTemplate("").getAll();
  }

  public getAll() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      level: this.level,
      duration: this.duration,
      public: this.public,
      imageUrl: this.imageUrl,
      active: this.active,
      weight: this.weight,
      groupId: this.groupId,
      templateId: this.templateId,
      group: this.group,
      template: this.template,
    };
  }
}

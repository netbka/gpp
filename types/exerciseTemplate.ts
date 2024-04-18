import { Base, type IBase, type Muscle } from "./types";
export interface IExerciseTemplate extends IBase {
  exerciseTemplateMuscle: Array<Muscle>;
  active: boolean;
  weight: number;
}

export class ExerciseTemplate extends Base implements IExerciseTemplate {
  public exerciseTemplateMuscle = [];
  public active: boolean;
  public weight: number;

  constructor(name?: string) {
    super(name);
    this.exerciseTemplateMuscle = [];
    this.active = false;
    this.weight = 0;
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
      exerciseTemplateMuscle: this.exerciseTemplateMuscle,
    };
  }
}

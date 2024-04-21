import { Base, type IBase, type IExerciseGroup, type TrainingTrack } from "./types";
export interface ITraining extends IBase {
  exerciseGroup: Array<IExerciseGroup>;
  trainingTrack: Array<TrainingTrack>;
  public: boolean;
}

export class Training extends Base implements ITraining {
  public exerciseGroup = [];
  public trainingTrack = [];
  public public: boolean;
  constructor(name?: string | "Новый план") {
    super(name);
    this.exerciseGroup = [];
    this.trainingTrack = [];
    this.public = false;
  }

  public getAll() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      level: this.level,
      duration: this.duration,
      public: this.public,

      exerciseGroup: this.exerciseGroup,
      trainingTrack: this.trainingTrack,
    };
  }
}

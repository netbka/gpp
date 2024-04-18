import { Base, type IBase, type IExerciseGroup, type TrainingTrack } from "./types";
export interface ITraining extends IBase {
  exerciseGroup: Array<IExerciseGroup>;
  trainingTrack: Array<TrainingTrack>;
}

export class Training extends Base implements ITraining {
  public exerciseGroup = [];
  public trainingTrack = [];
  constructor(name?: string) {
    super(name);
    this.exerciseGroup = [];
    this.trainingTrack = [];
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
      exerciseGroup: this.exerciseGroup,
      trainingTrack: this.trainingTrack,
    };
  }
}

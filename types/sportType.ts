import { IdName, type IIdName } from "./types";
export interface ISportType extends IIdName {
  description: string;
}

export class SportType extends IdName implements ISportType {
  public description: string;
  constructor(name?: string) {
    super(name);
    this.description = "";
  }

  public getAll() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}

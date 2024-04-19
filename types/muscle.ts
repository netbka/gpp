import { IdName, type IIdName } from "./types";
export interface IMuscle extends IIdName {}

export class Muscle extends IdName implements IMuscle {
  constructor(name?: string) {
    super(name);
  }

  public getAll() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

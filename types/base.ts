export interface IIdName {
  id?: number | null;
  name: string;
}

export abstract class IdName implements IIdName {
  id?: number | null;
  name: string;

  constructor(name?: string) {
    this.name = name ?? "";
    this.id = null;
  }

  public abstract getAll(): {};
}

export interface IBase extends IIdName {
  level: number;
  description: string;
  duration: number;
}

export abstract class Base implements IBase {
  description: string;
  level: number;
  duration: number;

  constructor(name?: string) {
    this.name = name ?? "";
    this.id = null;
    this.level = 1;
    this.description = "";
    this.duration = 30;
  }
  id?: number | null | undefined;
  name: string;

  public abstract getAll(): {};
}

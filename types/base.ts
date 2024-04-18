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
  public: boolean;
  //active: boolean;
  imageUrl: string;
  //weight: number;
}

// export interface IBaseUser extends IBase {
//   user_id: string;
// }

export abstract class Base implements IBase {
  // id?: number | null;
  // name: string;
  description: string;
  level: number;
  duration: number;
  public: boolean;
  imageUrl: string;
  //active: boolean;
  constructor(name?: string) {
    //super(name);
    this.name = name ?? "";
    this.id = null;
    this.level = 1;
    this.description = "";
    this.duration = 30;
    //this.active = false;
    this.imageUrl = "";

    this.public = false;
  }
  id?: number | null | undefined;
  name: string;

  public abstract getAll(): {};
}

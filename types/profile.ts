import { IdName, type IIdName, type ISportType } from "./types";
export interface IProfile extends IIdName {
  firstName?: string;
  lastName?: string;
  birthDay?: string;

  sportType: ISportType[];
  admin: boolean;
}

export class Profile extends IdName implements IProfile {
  firstName?: string;
  lastName?: string;
  birthDay?: string;

  admin: boolean;
  sportType: ISportType[] = [];
  constructor(name?: string) {
    super(name);
    this.firstName = "";
    this.lastName = "";
    this.birthDay = "";

    this.admin = false;
  }

  public getAll() {
    return {
      id: this.id,
      name: this.name,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDay: this.birthDay,

      admin: this.admin,
      sportType: this.sportType,
    };
  }
}
//SportType

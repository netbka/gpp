import { IdName, type IIdName, type ISportType } from "./types";
export interface IProfile extends IIdName {
  firstName?: string;
  lastName?: string;
  birthDay?: string;
  user_id: string;
  profilesSportType: ISportType[];
  is_admin: boolean;
}

export class Profile extends IdName implements IProfile {
  firstName?: string;
  lastName?: string;
  birthDay?: string;
  user_id: string;
  is_admin: boolean;
  profilesSportType: ISportType[] = [];
  constructor(name?: string) {
    super(name);
    this.firstName = "";
    this.lastName = "";
    this.birthDay = "";
    this.user_id = "";
    this.is_admin = false;
  }

  public getAll() {
    return {
      id: this.id,
      name: this.name,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDay: this.birthDay,
      user_id: this.user_id,
      is_admin: this.is_admin,
      profilesSportType: this.profilesSportType,
    };
  }
}

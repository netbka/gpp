export interface ISlug {
  id: number;
  name: string;
  action: string;
}

export class Slug implements ISlug {
  public id: number;
  public name: string;
  public action: string;
  public slug: string;
  constructor(slugObj: ISlug, action: string) {
    this.id = slugObj.id;
    this.name = slugObj.name;
    this.action = action;
    this.slug = generateSlug(this.id + "-" + this.name);
  }
  public getSlug() {
    return "/" + this.action + "/" + this.slug;
  }
}

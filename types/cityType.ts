export type City = {
  _id: number;
  city_code: number;
  city_name_he: string;
  city_name_en: string;
  region_code: number;
  region_name: string;
  PIBA_bureau_code: number;
  PIBA_bureau_name: string;
  Regional_Council_code: number;
  Regional_Council_name: string;
};

export interface Event {
  start: Date;
  end: Date;
  title: string;
  display: string;
  extendedProps: Object;
}

export interface ITablePagination {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
  level: number;
}

export class TablePagination implements ITablePagination {
  public sortBy = "name";
  public descending = false;
  public page = 1;
  public rowsPerPage = 12;
  public rowsNumber = 1;
  public level = 0;
  constructor(sortBy?: string, descending?: boolean, page?: number, rowsPerPage?: number, rowsNumber?: number, level?: number) {
    this.sortBy = sortBy ?? "name";
    this.descending = descending ?? false;
    this.page = page ?? 1;
    this.rowsPerPage = rowsPerPage ?? 12;
    this.rowsNumber = rowsNumber ?? 1;
    this.level = level ?? 0;
  }
  public updateRowsNumber(rowsNumber: number) {
    this.rowsNumber = rowsNumber;
  }
  public updateValues(values: ITablePagination) {
    this.sortBy = values.sortBy;
    this.descending = values.descending;
    this.page = values.page;
    this.rowsPerPage = values.rowsPerPage;
    this.rowsNumber = values.rowsNumber;
    this.level = values.level;
  }
  public getAll() {
    return {
      sortBy: this.sortBy,
      descending: this.descending,
      page: this.page,
      rowsPerPage: this.rowsPerPage,
      rowsNumber: this.rowsNumber,
      level: this.level,
    };
  }
}

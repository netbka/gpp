import { defineStore } from "pinia";
import { type IExerciseTemplate, ExerciseTemplate, TablePagination, type ITablePagination } from "~/types/types";

interface ExerciseTemplateStoreState {
  currentItem: IExerciseTemplate;
  itemArray: [];
  loading: boolean;
  //rowsNumber: number;
  pagination: ITablePagination;
  filter: string;
}
const baseUrl = "/api/exerciseTemplate/";
export const useExerciseTemplateStore = defineStore("exerciseTemplate", {
  state: (): ExerciseTemplateStoreState => ({
    currentItem: new ExerciseTemplate("").getAll(),
    itemArray: [],
    loading: false,
    //rowsNumber: 0,
    pagination: new TablePagination().getAll(),
    filter: "",
  }),
  getters: {
    getItemArray: (state) => {
      return state.itemArray;
    },
    getCurrentItemId: (state) => {
      return state.currentItem.id;
    },
  },
  actions: {
    resetCurrentItem(name: string): void {
      this.currentItem = new ExerciseTemplate(name).getAll();
    },
    // newItem(val) {
    //   this.currentItem = new ExerciseTemplate(val).getAll();
    //   return this.currentItem;
    // },
  },
});

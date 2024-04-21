import { defineStore } from "pinia";
import { type IMuscle } from "~/types/types";
interface MuscleStoreState {
  itemArray: IMuscle[];
  currentItem: IMuscle[];
  loading: boolean;
  rowsNumber: 0;
}

export const useMuscleStore = defineStore("muscle", {
  state: (): MuscleStoreState => ({
    itemArray: [],
    currentItem: [],

    loading: false,
    rowsNumber: 0,
  }),

  actions: {
    resetCurrentItem() {
      this.currentItem = Array<IMuscle>();
    },
    newItem() {
      this.currentItem = Array<IMuscle>();
    },
  },
});

import { defineStore } from "pinia";
import { type ISportType } from "~/types/types";
interface SportTypeStoreState {
  itemArray: ISportType[];
  currentItem: ISportType[];
  loading: boolean;
}

export const useSportTypeStore = defineStore("sporttype", {
  state: (): SportTypeStoreState => ({
    itemArray: Array<ISportType>(),
    currentItem: Array<ISportType>(),
    loading: false,
  }),

  actions: {
    resetCurrentItem() {
      this.currentItem = Array<ISportType>();
    },
    newItem() {
      this.currentItem = Array<ISportType>();
    },
  },
});

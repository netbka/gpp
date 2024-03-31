import { defineStore } from "pinia";
import { type SportType } from "~/types/types";
interface SportTypeStoreState {
  defaultItem: SportType;
  items: SportType[];
  currentItem: SportType[];
  loading: boolean;
  rowNumber: number;
}

export const useSportTypeStore = defineStore("SportTypeStore", {
  state: (): SportTypeStoreState => ({
    items: [],
    currentItem: [],
    defaultItem: {
      id: null,
      name: "",
      description: "",
    },
    loading: false,
    rowsNumber: 0,
  }),

  actions: {
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/sporttype/all", {
          method: "get",
        });

        if (response && response.length > 0) this.itemArray = response;
      })(null);
    },
  },
});

import { defineStore } from "pinia";
import { type SportType } from "~/types/types";
interface SportTypeStoreState {
  defaultItem: SportType;
  items: SportType[];
  currentItem: SportType[];
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
  }),

  actions: {
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const response = await $fetch("/api/sporttype/all", {
        method: "get",
      });

      if (response.value && response.value.length > 0) this.items = response.value;
    },
  },
});

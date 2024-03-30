import { defineStore } from "pinia";
import { type Muscle } from "~/types/types";
interface MuscleStoreState {
  defaultItem: Muscle;
  items: Muscle[];
  currentItem: Muscle;
}

export const useMuscleStore = defineStore("MuscleStore", {
  state: (): MuscleStoreState => ({
    items: [],
    currentItem: { id: 0, name: "" },
    defaultItem: {
      id: 0,
      name: "",
    },
  }),

  actions: {
    resetState() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },

    async fetchAll() {
      const { data } = await useFetch("/api/muscle/all", {
        method: "get",
      });

      if (data.value.length > 0) this.itemArray = data.value;
    },
  },
});

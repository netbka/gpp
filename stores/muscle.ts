import { defineStore } from "pinia";
import { type Muscle } from "~/types/types";
interface MuscleStoreState {
  defaultItem: Muscle[];
  itemArray: Muscle[];
  currentItem: Muscle[];
  loading: boolean;
  rowsNumber: 0;
}

export const useMuscleStore = defineStore("MuscleStore", {
  state: (): MuscleStoreState => ({
    itemArray: [],
    currentItem: [],
    defaultItem: [],
    loading: false,
    rowsNumber: 0,
  }),

  actions: {
    resetState() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },

    async fetchAll() {
      withErrorHandling(this)(async (props, store) => {
        const { data } = await useFetch("/api/muscle/all", {
          method: "get",
        });

        if (data.value.length > 0) this.itemArray = data.value;
      })(null);
    },
  },
});

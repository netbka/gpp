import { defineStore } from "pinia";

import { type Training } from "~/types/types";
interface PlanStoreState {
  defaultItem: Training;
  //items: Exercise[];
  currentItem: Training;
  itemArray: [];
  //itemArray: reacive<Exercise[]>;
  //activeExercise: Exercise | null;
}

export const usePlanStore = defineStore("PlanStore", {
  state: (): PlanStoreState => ({
    defaultItem: { id: 0, name: "", description: "" },
    currentItem: { id: 0, name: "", description: "" },
    itemArray: [],
  }),
  getters: {
    getItemArray: (state) => {
      return state.itemArray;
    },
    // getIimgUrl: (state) => {
    //   return state.currentItem.imageUrl;
    // },
    getCurrentItemId: (state) => {
      return state.currentItem.id;
    },
  },
  actions: {
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const { data } = await useFetch("/api/plan/all", {
        method: "get",
      });
      //console.log(data.value);
      if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      //console.log(this.itemArray);
    },
    async updateCurrentItem() {
      try {
        const response = await $fetch("/api/plan/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      } catch (error) {
        console.log(error);
      }
    },

    async updateItemField(field: String, val, id: number) {
      try {
        const item = getById(id, this.itemArray);
        if (item === null) return;
        item[field] = val;
        const response = await $fetch("/api/plan/field", {
          method: "post",
          body: { ...item, field },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItem(id) {
      const response = await $fetch("/api/plan/delete", {
        method: "delete",
        body: { id },
      });
      console.log(this.currentItem.id === id);
      if (this.currentItem.id === id) this.resetCurrentItem();
      removeItemFromArr(id, this.itemArray);
    },
  },
});

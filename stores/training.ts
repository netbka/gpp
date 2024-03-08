import { defineStore } from "pinia";

import { type Training, type ExerciseGroup } from "~/types/types";
interface TrainingStoreState {
  defaultItem: Training;
  //items: Exercise[];
  currentItem: Training;
  itemArray: [];
  //itemArray: reacive<Exercise[]>;
  //activeExercise: Exercise | null;
}

export const useTrainingStore = defineStore("TrainingStore", {
  state: (): TrainingStoreState => ({
    defaultItem: { id: 0, name: "", description: "", excerciseGroup: [] },
    currentItem: { id: 0, name: "", description: "", excerciseGroup: [] },
    itemArray: [],
  }),
  getters: {
    getItemArray: (state) => {
      return state.itemArray;
    },

    getCurrentItemId: (state) => {
      return state.currentItem.id;
    },
    getCurrentItem: (state) => {
      return state.currentItem;
    },
  },
  actions: {
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const { data } = await useFetch("/api/training/all", {
        method: "get",
      });
      //console.log(data.value);
      if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      //console.log(this.itemArray);
    },
    async getById(id: number) {
      try {
        const response = await $fetch("/api/training/" + id, {
          method: "get",
        });
        if (response) {
          updateArray(response, this.itemArray);
          this.currentItem = response;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateCurrentItem() {
      try {
        const response = await $fetch("/api/training/update", {
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
        const response = await $fetch("/api/training/field", {
          method: "post",
          body: { ...item, field },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItem(id) {
      const response = await $fetch("/api/training/delete", {
        method: "delete",
        body: { id },
      });
      console.log(this.currentItem.id === id);
      if (this.currentItem.id === id) this.resetCurrentItem();
      removeItemFromArr(id, this.itemArray);
    },
    async addGroup() {
      try {
        this.currentItem.excerciseGroup.push({
          id: 1,
          name: "aaa",
          trainingId: this.currentItem.id,
        });
        console.log(this.currentItem.excerciseGroup);
        // const response = await $fetch("/api/training/update", {
        //   method: "post",
        //   body: { ...this.currentItem },
        // });

        // updateArray(response, this.itemArray);
        // this.currentItem = response;
      } catch (error) {
        console.log(error);
      }
    },
  },
});

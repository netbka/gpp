import { defineStore } from "pinia";

import { type ExerciseGroup } from "~/types/types";
interface ExerciseGroupStoreState {
  defaultItem: ExerciseGroup;
  //items: Exercise[];
  currentItem: ExerciseGroup;
  itemArray: ExerciseGroup[];
  //itemArray: reacive<Exercise[]>;
  //activeExercise: Exercise | null;
}

export const useExerciseGroupStore = defineStore("ExerciseGroupStore", {
  state: (): ExerciseGroupStoreState => ({
    defaultItem: { id: 0, name: "Группа №", description: "", repeats: 1, active: false, trainingId: 0, exercise: [] },
    currentItem: { name: "", description: "", repeats: 0, active: false, trainingId: 0, exercise: [] },
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
    resetCurrentItem(trainingId: Number, itemCount: Number) {
      this.currentItem = Object.assign({}, this.defaultItem);
      this.currentItem.trainingId = trainingId;
      this.currentItem.name = this.currentItem.name + (itemCount + 1);
      this.currentItem.id = null;
    },
    async fetchAll() {
      const { data } = await useFetch("/api/exerciseGroup/all", {
        method: "get",
      });
      //console.log(data.value);
      if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      //console.log(this.itemArray);
    },
    async getById(id: number) {
      try {
        const response = await $fetch("/api/exerciseGroup/" + id, {
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
    async create() {
      try {
        const response = await $fetch("/api/exerciseGroup/create", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
        return this.currentItem;
      } catch (error) {
        console.log(error);
      }
    },

    async updateCurrentItem() {
      try {
        const response = await $fetch("/api/exerciseGroup/update", {
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
        const response = await $fetch("/api/exerciseGroup/field", {
          method: "post",
          body: { ...item, field },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItem(id) {
      const response = await $fetch("/api/exerciseGroup/delete", {
        method: "delete",
        body: { id },
      });
      console.log(this.currentItem.id === id);
      if (this.currentItem.id === id) this.resetCurrentItem();
      removeItemFromArr(id, this.itemArray);
    },
  },
});

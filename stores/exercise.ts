import { defineStore } from "pinia";
import { type Exercise, type ExerciseGroup } from "~/types/types";
interface ExerciseStoreState {
  defaultItem: Exercise;
  //items: Exercise[];
  currentItem: Exercise;
  itemArray: [];
  //itemArray: reacive<Exercise[]>;
  //activeExercise: Exercise | null;
}

export const useExerciseStore = defineStore("ExerciseStore", {
  state: (): ExerciseStoreState => ({
    defaultItem: { id: null, name: "", description: "", duration: 30, active: false, imageUrl: "", weight: 0, muscleId: null, muscle: null },
    currentItem: { id: null, name: "", description: "", duration: 30, active: false, imageUrl: "", weight: 0, muscleId: null, muscle: null },
    itemArray: [],
    loading: false,
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
    async newExercise(groupId: number) {
      this.currentItem = Object.assign({}, this.defaultItem);
      this.currentItem.name = "";
      this.currentItem.groupId = groupId;
      try {
        const response = await $fetch("/api/exercise/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const { data } = await useFetch("/api/exercise/all", {
        method: "get",
      });
      //console.log(data.value);
      if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      //console.log(this.itemArray);
    },
    async cloneTemplateItem(template, item) {
      try {
        this.currentItem = Object.assign({}, item);

        this.currentItem.name = template.name;
        this.currentItem.description = template.description;
        this.currentItem.duration = template.duration;
        this.currentItem.imageUrl = template.imageUrl;
        this.currentItem.muscleId = template.muscleId;
        this.currentItem.muscle = template.muscle;
        this.currentItem.templateId = template.id;
        const response = await $fetch("/api/exercise/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        // updateArray(response, this.itemArray);
        this.currentItem = response;
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    async updateCurrentItem() {
      try {
        const response = await $fetch("/api/exercise/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      } catch (error) {
        console.log(error);
      }
    },
    async updateCustomExercise(exercise, val) {
      this.currentItem = Object.assign({}, exercise);
      this.currentItem.name = val;
      const response = await $fetch("/api/exercise/update", {
        method: "post",
        body: { ...this.currentItem },
      });
      this.currentItem = response;
      return response;
    },
    async updateItemField(field: String, val, id: number, item: Exercise) {
      try {
        item = item ? item : getById(id, this.itemArray);

        if (item === null || item === undefined) return;
        item[field] = val;
        const response = await $fetch("/api/exercise/field", {
          method: "post",
          body: { ...item, field },
        });
        //  console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItem(id) {
      const response = await $fetch("/api/exercise/delete", {
        method: "delete",
        body: { id },
      });
      // console.log(this.currentItem.id === id);
      if (this.currentItem.id === id) this.resetCurrentItem();
      removeItemFromArr(id, this.itemArray);
    },
  },
});

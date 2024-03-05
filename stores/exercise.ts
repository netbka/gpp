import { defineStore } from "pinia";
import { type Exercise, type ExerciseGroup } from "~/types/types";
interface ExcerciseStoreState {
  defaultItem: Exercise;
  //items: Exercise[];
  currentItem: Exercise;
  itemArray: [];
  //itemArray: reacive<Exercise[]>;
  //activeExercise: Exercise | null;
}

export const useExerciseStore = defineStore("ExcerciseStore", {
  state: (): ExcerciseStoreState => ({
    defaultItem: { id: 0, name: "", description: "", duration: 30, active: false, imageUrl: "", weight: 0, public: false, muscleId: 0, muscle: null },
    currentItem: { id: 0, name: "", description: "", duration: 30, active: false, imageUrl: "", weight: 0, public: false, muscleId: 0, muscle: null },
    itemArray: [],
  }),
  getters: {
    getItemArray: (state) => {
      return state.itemArray;
    },
    getIimgUrl: (state) => {
      return state.currentItem.imageUrl;
    },
  },
  actions: {
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const { data } = await useFetch("/api/exercise/all", {
        method: "get",
      });

      if (data.value.length > 0) this.itemArray = data.value;
      // console.log(this.itemArray);
    },
    async updateCurrentItem() {
      const response = await $fetch("/api/exercise/update", {
        method: "post",
        body: { ...this.currentItem },
      });

      updateArray(response, this.itemArray);

      //console.log(response);
    },
    getGroupedArray() {
      return this.itemArray.reduce((groups, item) => {
        const group = groups[item.muscle.name] || [];
        group.push(item);
        groups[item.muscle.name] = group;
        return groups;
      }, {});
    },
  },
});

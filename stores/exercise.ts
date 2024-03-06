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
      const { data } = await useFetch("/api/exercise/all", {
        method: "get",
      });
      //console.log(data.value);
      if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      //console.log(this.itemArray);
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
    async deleteItem(id) {
      const response = await $fetch("/api/exercise/delete", {
        method: "delete",
        body: { id },
      });
      console.log(this.currentItem.id === id);
      if (this.currentItem.id === id) this.resetCurrentItem();
      removeItemFromArr(id, this.itemArray);
    },
    // getGroupedArray() {
    //   return this.itemArray.reduce((groups, item) => {
    //     const group = groups[item.muscle.name] || [];
    //     group.push(item);
    //     groups[item.muscle.name] = group;
    //     return groups;
    //   }, {});
    // },
    getGroupedArray() {
      const groups = this.itemArray.reduce((groups, item) => {
        const group = groups[item.muscle.name] || [];
        group.push(item);
        groups[item.muscle.name] = group;
        return groups;
      }, {});

      // Convert the groups object to an array of entries
      const groupEntries = Object.entries(groups);

      // Sort the group entries by item.muscle.id
      groupEntries.sort((a, b) => {
        const firstMuscleId = a[1][0].muscle.id;
        const secondMuscleId = b[1][0].muscle.id;
        return firstMuscleId - secondMuscleId;
      });

      // Convert the sorted array of entries back to an object
      const sortedGroups = Object.fromEntries(groupEntries);

      return sortedGroups;
    },
  },
});

import { defineStore } from "pinia";

import { ExerciseGroup, type IExerciseGroup } from "~/types/types";
interface ExerciseGroupStoreState {
  currentItem: IExerciseGroup;
  itemArray: IExerciseGroup[];
  loading: boolean;
}

export const useExerciseGroupStore = defineStore("exerciseGroup", {
  state: (): ExerciseGroupStoreState => ({
    currentItem: new ExerciseGroup().getAll(),
    itemArray: [],
    loading: false,
  }),
  getters: {
    // getItemArray: (state) => {
    //   return state.itemArray;
    // },
    // getCurrentItemId: (state) => {
    //   return state.currentItem.id;
    // },
    // getCurrentItem: (state) => {
    //   return state.currentItem;
    // },
  },
  actions: {
    resetCurrentItem(trainingId: number, itemCount: number) {
      this.currentItem = new ExerciseGroup(undefined, itemCount + 1, trainingId).getAll();
    },
  },
});

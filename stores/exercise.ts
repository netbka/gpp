import { defineStore } from "pinia";
import { type IExercise, Exercise, type IExerciseTemplate } from "~/types/types";
interface ExerciseStoreState {
  currentItem: IExercise;
  itemArray: [];
  loading: boolean;
}

export const useExerciseStore = defineStore("exercise", {
  state: (): ExerciseStoreState => ({
    currentItem: new Exercise().getAll(),
    itemArray: [],
    loading: false,
  }),
  getters: {
    getItemArray: (state) => {
      return state.itemArray;
    },

    getCurrentItemId: (state) => {
      return state.currentItem.id;
    },
  },
  actions: {
    resetCurrentItem(name: string, groupId: number): void {
      this.currentItem = new Exercise(name, groupId).getAll();
    },
    async newExercise(groupId: number) {
      this.currentItem = new Exercise(undefined, groupId).getAll();
    },
    cloneTemplateItem(template: IExerciseTemplate, exercise: Exercise) {
      this.currentItem = new Exercise().cloneTemplate(template, exercise);
    },
    cloneExerciseItem(exerciseToClone: Exercise, name: string, templateId?: number) {
      this.currentItem = new Exercise().cloneExercise(exerciseToClone, name);
      this.currentItem.templateId = templateId;
    },
  },
});

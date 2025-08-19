import { defineStore } from "pinia";
import { type ITraining, Training, type IExerciseGroup, ExerciseGroup, TablePagination, type ITablePagination } from "~/types/types";

interface TrainingStoreState {
  currentItem: ITraining;
  itemArray: ITraining[];
  loading: boolean;
  pagination: ITablePagination;
  filter: string;
  activeGroup: IExerciseGroup;
  isStarted: boolean;
}
const baseUrl = "/api/training/";
export const useTrainingStore = defineStore("training", {
  state: (): TrainingStoreState => ({
    currentItem: new Training("").getAll(),
    itemArray: [],
    loading: false,
    pagination: new TablePagination().getAll(),
    filter: "",
    activeGroup: new ExerciseGroup().getAll(),
    isStarted: false,
  }),
  getters: {
    getDuration: (state) => {
      return state.currentItem.exerciseGroup.length > 0 ? calculateDuration(state.currentItem.exerciseGroup) : 0;
    },
    getIsStarted: (state) => {
      return state.isStarted;
    },
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
    resetCurrentItem(val: string): void {
      this.currentItem = new Training(val).getAll();
    },

    async updateTrainingPlan() {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch(baseUrl + "updatenew", {
          method: "post",
          body: { ...this.currentItem },
        });
      })(null);
    },

    async setDuration(val: number) {
      //this.currentItem.exerciseGroup = this.currentItem.exerciseGroup.filter((obj) => obj !== undefined);
      this.currentItem.exerciseGroup.forEach((parent) => {
        parent.exercise.forEach((child) => {
          child.duration = val;
        });
      });
      // const response = await $fetch(baseUrl + "updateGroupDuration", {
      //   method: "post",
      //   body: { id: this.currentItem.id, duration: val },
      // });
    },
    getActiveExerciseDuration() {
      var index = this.getActiveExerciseIndex();
      if (index > -1) return this.activeGroup.exercise[index].duration;
      return 0;
    },
    getInitialActiveGroup() {
      let initialActiveGroup = {};

      initialActiveGroup = Object.assign({}, this.currentItem.exerciseGroup.filter((item) => item.exercise.length > 0)[0]);

      this.activeGroup = initialActiveGroup;

      return this.currentItem.exerciseGroup.findIndex((item) => item["id"] === this.activeGroup.id);
    },
    setActiveGroup(val: boolean) {
      const foundItem = this.currentItem.exerciseGroup.find((item) => item.id === this.activeGroup.id);
      if (foundItem) foundItem.active = val;
    },
    setActiveExercise(index: number, val: boolean) {
      this.activeGroup.exercise[index].active = val;
    },
    getActiveGroupIndex() {
      return this.activeGroup.findIndex((item) => item["active"] === true);
    },
    getActiveExerciseIndex() {
      if (!this.activeGroup.exercise) return -1;
      return this.activeGroup.exercise.findIndex((item) => item["active"] === true);
    },
    // setNextActiveGroup(_index: number): number {
    //   while (_index< this.currentItem.exerciseGroup.length){

    //     _index +=1;
    //   }
    // },
    getPrevGroupByIndex(_index: number): number {
      if (_index < 0) return -1;
      const initialActiveGroup = Object.assign({}, this.currentItem.exerciseGroup.filter((item, index) => index === _index)[0]);
      if (initialActiveGroup.exercise.length === 0) {
        return this.getPrevGroupByIndex(_index - 1); //no exercise in group
      } else {
        this.activeGroup = initialActiveGroup;
        return _index;
      }
    },
    getNextGroupByIndex(_index: number): number {
      if (_index + 1 > this.currentItem.exerciseGroup.length) return -1;

      const initialActiveGroup = Object.assign({}, this.currentItem.exerciseGroup.filter((item, index) => index === _index)[0]);
      if (initialActiveGroup.exercise.length === 0) {
        return this.getNextGroupByIndex(_index + 1); //no exercise in group
      } else {
        this.activeGroup = initialActiveGroup;
        return _index;
      }
    },

    resetActive() {
      this.currentItem.exerciseGroup.forEach((parent) => {
        parent.active = false;
        parent.exercise.forEach((child) => {
          child.active = false;
        });
      });
    },
  },
});

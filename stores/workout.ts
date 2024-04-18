import { defineStore } from "pinia";
import { type Exercise, type ExerciseGroup, TablePagination, type ITablePagination } from "~/types/types";

interface WorkoutStoreState {
  defaultItem: ExerciseGroup[];
  //items: Exercise[];
  currentItem: ExerciseGroup[];
  activeGroup: ExerciseGroup;
  //activeExercise: Exercise | null;
}

export const useWorkoutStore = defineStore("WorkoutStore", {
  state: (): WorkoutStoreState => ({
    isStarted: false,
    activeGroup: {},
    //activeExercise: null,
    //items: [],
    currentItem: [],
    defaultItem: [
      {
        id: 1,
        name: "Разминка",
        exercise: [
          {
            id: 1,
            name: "Бег на месте",
            description: "Описание бега на месте",
            duration: 1,
            active: false,
          },
          {
            id: 2,
            name: "Прыжки на месте",
            description: "Описание прыжки на стопе",
            duration: 1,
            active: false,
          },
        ],
        //rest: 30,
        repeats: 1,
        active: false,
      },
      {
        id: 2,
        name: "Занятие",
        exercise: [
          {
            id: 3,
            name: "Отжимание",
            description: "Описание отжимания",
            duration: 1,
            active: false,
          },
          {
            id: 4,
            name: "Приседания",
            description: "Описание приседания",
            duration: 1,
            active: false,
          },
        ],
        //rest: 30,
        repeats: 1,
        active: false,
      },
      {
        id: 3,
        name: "Заминка",
        exercise: [
          {
            id: 5,
            name: "Разножка",
            description: "Описание бега на месте",
            duration: 1,
            active: false,
          },
          {
            id: 6,
            name: "Прыжки на месте",
            description: "Описание прыжки на стопе",
            duration: 1,
            active: false,
          },
        ],
        //rest: 30,
        repeats: 1,
        active: false,
      },
    ],
  }),
  getters: {
    // getActiveExerciseDuration: (state) => {
    //   if (state.activeGroup.exercise && state.activeGroup.exercise.length > 0) return state.activeGroup.exercise[0].duration;
    //   else return 0;
    // },
  },
  actions: {
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const { data } = await useFetch("/api/Exercise/all", {
        method: "get",
      });

      if (data.value.length > 0) this.itemArray = data.value;
    },
    calculateDuration() {
      var totalduration = 0;
      this.defaultItem.forEach((parent) => {
        var phaseduration = 0;
        parent.exercise.forEach((child) => {
          phaseduration += parseInt(child.duration);
        });

        phaseduration = phaseduration * parseInt(parent.repeats);
        totalduration += phaseduration;
      });
      return totalduration;
    },
    getActiveExerciseDuration() {
      var index = this.getActiveExerciseIndex();
      if (index > -1) return this.activeGroup.exercise[index].duration;
      return 0;
    },
    getInitialActiveGroup() {
      let initialActiveGroup = {};

      initialActiveGroup = Object.assign({}, this.defaultItem.filter((item) => item.exercise.length > 0)[0]);
      //initialActiveGroup.exercise = Object.assign({}, initialActiveGroup.exercise.filter((item, index) => index === 0)[0]);
      this.activeGroup = initialActiveGroup;
      //this.activeGroup.exercise = initialActiveGroup.exercise.slice(0, 1);

      return this.defaultItem.findIndex((item) => item["id"] === this.activeGroup.id);
    },
    setActiveGroup(val: boolean) {
      const foundItem = this.defaultItem.find((item) => item.id === this.activeGroup.id);
      foundItem.active = val;
    },
    setActiveExercise(index: number, val: boolean) {
      // item.exercise.forEach((child) => {
      //   if (child.id === this.activeGroup.exercise[0].id) child.active = val;
      // });
      this.activeGroup.exercise[index].active = val;
    },
    getActiveGroupIndex() {
      return this.activeGroup.findIndex((item) => item["active"] === true);
    },
    getActiveExerciseIndex() {
      if (!this.activeGroup.exercise) return -1;
      return this.activeGroup.exercise.findIndex((item) => item["active"] === true);
    },

    getGroupByIndex(_index: number): number {
      if (_index + 1 > this.defaultItem.length) return -1;

      const initialActiveGroup = Object.assign({}, this.defaultItem.filter((item, index) => index === _index)[0]);
      if (initialActiveGroup.exercise.length === 0) return this.getGroupByIndex(_index + 1); //no exercise in group
      this.activeGroup = initialActiveGroup;
      return _index;
    },
    resetActive() {
      this.defaultItem.forEach((parent) => {
        parent.active = false;
        parent.exercise.forEach((child) => {
          child.active = false;
        });
      });
    },
    setDuration(val: number) {
      this.defaultItem.forEach((parent) => {
        //parent.duration = val;
        parent.exercise.forEach((child) => {
          child.duration = val;
        });
      });
    },
  },
});

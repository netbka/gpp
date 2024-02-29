import { Exercise } from "./../types/types";
import { defineStore } from "pinia";
import { type Exercise, type ExerciseGroup } from "~/types/types";
interface ExcerciseStoreState {
  defaultItem: ExerciseGroup[];
  items: Exercise[];
  currentItem: ExerciseGroup[];
  activeGroup: ExerciseGroup;
  //activeExercise: Exercise | null;
}

export const useExcerciseStore = defineStore("ExcerciseStore", {
  state: (): ExcerciseStoreState => ({
    activeGroup: {},
    //activeExercise: null,
    items: [],
    currentItem: [],
    defaultItem: [
      {
        id: "1",
        name: "Разминка",
        exercise: [
          {
            id: "1-1",
            name: "Бег на месте",
            description: "Описание бега на месте",
            duration: 1,
            active: false,
          },
          {
            id: "1-2",
            name: "Прыжки на месте",
            description: "Описание прыжки на стопе",
            duration: 1,
            active: false,
          },
        ],
        //rest: 30,
        repeats: 2,
        active: false,
      },
      {
        id: "2",
        name: "Занятие",
        exercise: [
          {
            id: "2-1",
            name: "Отжимание",
            description: "Описание отжимания",
            duration: 70,
            active: false,
          },
          {
            id: "2-2",
            name: "Приседания",
            description: "Описание приседания",
            duration: 60,
            active: false,
          },
        ],
        //rest: 30,
        repeats: 2,
        active: false,
      },
      {
        id: "3",
        name: "Заминка",
        exercise: [
          {
            id: "3-1",
            name: "Разножка",
            description: "Описание бега на месте",
            duration: 60,
            active: false,
          },
          {
            id: "3-2",
            name: "Прыжки на месте",
            description: "Описание прыжки на стопе",
            duration: 60,
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
    // getActiveExcerciseDuration: (state) => {
    //   if (state.activeGroup.exercise && state.activeGroup.exercise.length > 0) return state.activeGroup.exercise[0].duration;
    //   else return 0;
    // },
  },
  actions: {
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const { data } = await useFetch("/api/Excercise/all", {
        method: "get",
      });

      if (data.value.length > 0) this.items = data.value;
    },
    calculateDuration() {
      var totalduration = 0;
      this.defaultItem.forEach((parent) => {
        var phaseduration = 0;
        parent.exercise.forEach((child) => {
          phaseduration += parseInt(child.duration);
          //console.log(parseInt(phaseduration));
        });
        //phaseduration += parseInt(parent.rest);
        phaseduration = phaseduration * parseInt(parent.repeats);
        totalduration += phaseduration;
        // console.log("phase:" + parent.name + "duration" + phaseduration);
      });
      return totalduration;
    },
    getActiveExcerciseDuration() {
      var index = this.getActiveExcerciseIndex();
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
    getActiveExcerciseIndex() {
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
    // getNextExercise() {
    //   var grpIndex = this.defaultItem.findIndex((item) => item["id"] === this.activeGroup.id);
    //   var exerciseIndex = this.defaultItem[grpIndex].exercise.findIndex((item) => item["id"] === this.activeGroup.exercise[0].id);
    //   if (this.defaultItem[grpIndex].exercise.length > exerciseIndex + 1) {
    //     this.activeGroup.exercise[0] = this.defaultItem[grpIndex].exercise[exerciseIndex + 1];
    //     return true;
    //   }
    //   return false;

    //   //findNextItemById()
    // },
    // getNextGroup() {
    //   var grpIndex = this.defaultItem.findIndex((item) => item["id"] === this.activeGroup.id);
    //   if (this.defaultItem.length > grpIndex + 1) {
    //     const initialActiveGroup = Object.assign(
    //       {},
    //       this.defaultItem.filter((item, index) => index === grpIndex + 1)
    //     );

    //     return true;
    //   }
    //   return false;
    // },
  },
});
// getNextExercise() {
//       var grpIndex = this.defaultItem.findIndex((item) => item["id"] === this.activeGroup.id);
//       var exerciseIndex = this.defaultItem[grpIndex].exercise.findIndex((item) => item["id"] === this.activeGroup.exercise[0].id);
//       if (this.defaultItem[grpIndex].exercise.length > exerciseIndex + 1) {
//         this.activeGroup.exercise[0] = this.defaultItem[grpIndex].exercise[exerciseIndex + 1];
//         return true;
//       }
//       return false;

//       //findNextItemById()
//     },
//     getGroupByIndex(index: number) {
//       const initialActiveGroup = Object.assign(
//         {},
//         this.defaultItem.filter((item, index) => index === index + 1)
//       );
//       if (initialActiveGroup.exercise.length === 0) return false;
//       this.activeGroup = initialActiveGroup;
//       this.activeGroup.exercise = initialActiveGroup.exercise.slice(0, 1);
//       return true;
//     },
//     getNextGroup() {
//       var grpIndex = this.defaultItem.findIndex((item) => item["id"] === this.activeGroup.id);
//       if (this.defaultItem.length > grpIndex + 1) {
//         const initialActiveGroup = Object.assign(
//           {},
//           this.defaultItem.filter((item, index) => index === grpIndex + 1)
//         );

//         return true;
//       }
//       return false;
//     },

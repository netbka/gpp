import { defineStore } from "pinia";
import { type Exercise, type ExerciseGroup } from "~/types/types";
interface ExcerciseStoreState {
  defaultItem: ExerciseGroup[];
  items: Exercise[];
  currentItem: ExerciseGroup[];
}

export const useExcerciseStore = defineStore("ExcerciseStore", {
  state: (): ExcerciseStoreState => ({
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
            duration: 10,
            active: false,
          },
          {
            id: "1-2",
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
  },
});

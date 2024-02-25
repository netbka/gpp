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
            duration: 60,
          },
          {
            id: "1-2",
            name: "Прыжки на месте",
            description: "Описание прыжки на стопе",
            duration: 60,
          },
        ],
        rest: 30,
        repeats: 1,
      },
      {
        id: "2",
        name: "Занятие",
        exercise: [
          {
            id: "2-1",
            name: "Отживание",
            description: "Описание отжимания",
            duration: 60,
          },
          {
            id: "2-2",
            name: "Приседания",
            description: "Описание приседания",
            duration: 60,
          },
        ],
        rest: 30,
        repeats: 2,
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
  },
});

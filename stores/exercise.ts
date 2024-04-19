import { defineStore } from "pinia";
import { type IExercise, Exercise, type ExerciseGroup } from "~/types/types";
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
    // getIimgUrl: (state) => {
    //   return state.currentItem.imageUrl;
    // },
    getCurrentItemId: (state) => {
      return state.currentItem.id;
    },
  },
  actions: {
    resetCurrentItem() {
      this.currentItem = new Exercise().getAll();
    },
    async newExercise(groupId: number) {
      this.currentItem = new Exercise().getAll();
      this.currentItem.groupId = groupId;
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/exercise/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
        //return response;
      })(null);
    },

    async fetchAll() {
      withErrorHandling(this)(async (props, store) => {})(null);
      const { data } = await useFetch("/api/exercise/all", {
        method: "get",
      });

      if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
    },
    async cloneTemplateItem(template, item) {
      withErrorHandling(this)(async (props, store) => {
        this.currentItem = Object.assign({}, item);

        this.currentItem.name = template.name;
        this.currentItem.description = template.description;
        this.currentItem.duration = template.duration;
        this.currentItem.imageUrl = template.imageUrl;

        this.currentItem.templateId = template.id;
        const response = await $fetch("/api/exercise/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        this.currentItem = response;
        //return response;
      })(null);
    },
    async updateCurrentItem() {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/exercise/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      })(null);
    },
    async updateCustomExercise(exercise, val) {
      withErrorHandling(this)(async (props, store) => {
        this.currentItem = Object.assign({}, exercise);
        this.currentItem.name = val;
        const response = await $fetch("/api/exercise/update", {
          method: "post",
          body: { ...this.currentItem },
        });
        this.currentItem = response;
        // return response;
      })(null);
    },
    async updateItemField(field: String, val, id: number, item: Exercise) {
      withErrorHandling(this)(async (props, store) => {
        item = item ? item : getByIdFromArray(id, this.itemArray);

        if (item === null || item === undefined) return;
        item[field] = val;
        const response = await $fetch("/api/exercise/field", {
          method: "post",
          body: { ...item, field },
        });
      })(null);
    },

    async deleteItem(id) {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/exercise/delete", {
          method: "delete",
          body: { id },
        });

        if (this.currentItem.id === id) this.resetCurrentItem();
        removeItemFromArr(id, this.itemArray);
      })(null);
    },
  },
});

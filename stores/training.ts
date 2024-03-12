import { defineStore } from "pinia";

import { type Training, type ExerciseGroup } from "~/types/types";
interface TrainingStoreState {
  defaultItem: Training;
  //items: Exercise[];
  currentItem: Training;
  itemArray: [];
  loading: Boolean;
  //itemArray: reacive<Exercise[]>;
  //activeExercise: Exercise | null;
}

const withErrorHandling = (store) => (actionFn) => async (payload) => {
  try {
    store.loading = true;
    await actionFn(payload, store);
  } catch (error) {
    console.error("Error in action:", error);
    // optionally, you can handle the error or display an error message to the user
  } finally {
    store.loading = false;
  }
};

export const useTrainingStore = defineStore("TrainingStore", {
  state: (): TrainingStoreState => ({
    defaultItem: { id: null, name: "", description: "", public: true, exerciseGroup: [] },
    currentItem: { id: null, name: "", description: "", public: true, exerciseGroup: [] },
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
    getCurrentItem: (state) => {
      return state.currentItem;
    },
  },
  actions: {
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    async fetchAll() {
      const { data } = await useFetch("/api/training/all", {
        method: "get",
      });
      //console.log(data.value);
      if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      //console.log(this.itemArray);
    },
    async getById(id: number) {
      try {
        const response = await $fetch("/api/training/" + id, {
          method: "get",
        });
        if (response) {
          updateArray(response, this.itemArray);
          this.currentItem = response;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateCurrentItem() {
      try {
        this.loading = true;
        const response = await $fetch("/api/training/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    createCurrentItem() {
      withErrorHandling(this)(async (payload, store) => {
        const response = await $fetch("/api/training/create", {
          method: "post",
          body: { ...store.currentItem },
        });

        updateArray(response, store.itemArray);
        store.currentItem = response;
      })();
    },
    // async createCurrentItem() {
    //   try {
    //     this.loading = true;
    //     const response = await $fetch("/api/training/create", {
    //       method: "post",
    //       body: { ...this.currentItem },
    //     });

    //     updateArray(response, this.itemArray);
    //     this.currentItem = response;
    //   } catch (error) {
    //     console.log(error);
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async updateTrainingPlan() {
      try {
        this.loading = true;
        //  console.log(this.currentItem);
        const response = await $fetch("/api/training/updatenew", {
          method: "post",
          body: { ...this.currentItem },
        });

        // this.currentItem = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },

    async updateItemField(field: String, val, id: number) {
      console.log(field, val, id);
      try {
        const item = getById(id, this.itemArray);
        if (item === null) return;
        item[field] = val;
        const response = await $fetch("/api/training/field", {
          method: "post",
          body: { ...item, field },
        });
      } catch (error) {
        console.log(error);
      }
    },

    async deleteItem(id) {
      try {
        this.loading = false;
        const response = await $fetch("/api/training/delete", {
          method: "delete",
          body: { id },
        });

        if (this.currentItem.id === id) this.resetCurrentItem();
        removeItemFromArr(id, this.itemArray);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    setDuration(val: number) {
      this.currentItem.exerciseGroup.forEach((parent) => {
        //parent.duration = val;
        parent.exercise.forEach((child) => {
          child.duration = val;
        });
      });
    },
    // async addGroup() {
    //   try {
    //     this.currentItem.exerciseGroup.push({
    //       id: 1,
    //       name: "aaa",
    //       trainingId: this.currentItem.id,
    //     });
    //     console.log(this.currentItem.exerciseGroup);
    //     // const response = await $fetch("/api/training/update", {
    //     //   method: "post",
    //     //   body: { ...this.currentItem },
    //     // });

    //     // updateArray(response, this.itemArray);
    //     // this.currentItem = response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
  },
});

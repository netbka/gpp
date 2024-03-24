// withErrorHandling(this)(async (props, store) => {

//        })(props);

import { defineStore } from "pinia";

import { type Training, type ExerciseGroup } from "~/types/types";
interface TrainingStoreState {
  activeGroup: ExerciseGroup;

  defaultItem: Training;
  currentItem: Training;
  itemArray: [];
  loading: Boolean;

  //itemArray: reacive<Exercise[]>;
  //activeExercise: Exercise | null;
}

export const useTrainingStore = defineStore("TrainingStore", {
  state: (): TrainingStoreState => ({
    defaultItem: { id: null, name: "", description: "", public: true, exerciseGroup: [] },
    currentItem: { id: null, name: "", description: "", public: true, exerciseGroup: [] },
    itemArray: [],
    loading: false,
    isStarted: false,
    activeGroup: {},
    rowsNumber: 0,
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
      withErrorHandling(this)(async (props, store) => {
        const { data } = await useFetch("/api/training/all", {
          method: "get",
        });

        if (data.value !== null && data.value.length > 0) this.itemArray = data.value;
      })(null);
    },
    async getById(id: number) {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/training/" + id, {
          method: "get",
        });
        if (response) {
          updateArray(response, this.itemArray);
          this.currentItem = response;
        }
      })(null);
    },

    async updateCurrentItem() {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/training/update", {
          method: "post",
          body: { ...this.currentItem },
        });

        updateArray(response, this.itemArray);
        this.currentItem = response;
      })(null);
    },
    async searchOwn(props) {
      if (props) {
        withErrorHandling(this)(async (props, store) => {
          const response = await $fetch("/api/training/own", {
            query: { filter: props.filter, ...props.pagination },
          });
          store.itemArray = response.result;
          store.rowsNumber = response.totalCount;
        })(props);
      }
    },
    async search(props) {
      if (props) {
        withErrorHandling(this)(async (props, store) => {
          const response = await $fetch("/api/training/search", {
            query: { filter: props.filter, ...props.pagination },
          });
          store.itemArray = response.result;
          store.rowsNumber = response.totalCount;
        })(props);
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
      })(null);
    },

    async updateTrainingPlan() {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/training/updatenew", {
          method: "post",
          body: { ...this.currentItem },
        });
      })(null);
    },

    async updateItemField(field: String, val, id: number) {
      withErrorHandling(this)(async (props, store) => {
        const item = getById(id, this.itemArray);
        if (item === null) return;
        item[field] = val;
        const response = await $fetch("/api/training/field", {
          method: "post",
          body: { ...item, field },
        });
      })(null);
    },

    async deleteItem(id) {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/training/delete", {
          method: "delete",
          body: { id },
        });

        if (this.currentItem.id === id) this.resetCurrentItem();
        removeItemFromArr(id, this.itemArray);
      })(null);
    },
    async setDuration(val: number) {
      //this.currentItem.exerciseGroup = this.currentItem.exerciseGroup.filter((obj) => obj !== undefined);
      this.currentItem.exerciseGroup.forEach((parent) => {
        parent.exercise.forEach((child) => {
          child.duration = val;
        });
      });
      const response = await $fetch("/api/training/updateGroupDuration", {
        method: "post",
        body: { id: this.currentItem.id, duration: val },
      });
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
      foundItem.active = val;
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

    getGroupByIndex(_index: number): number {
      if (_index + 1 > this.currentItem.exerciseGroup.length) return -1;

      const initialActiveGroup = Object.assign({}, this.currentItem.exerciseGroup.filter((item, index) => index === _index)[0]);
      if (initialActiveGroup.exercise.length === 0) return this.getGroupByIndex(_index + 1); //no exercise in group
      this.activeGroup = initialActiveGroup;
      return _index;
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

import { defineStore } from "pinia";
import { type TrainingTrack } from "~/types/types";
interface TrainingTrackStoreState {
  defaultItem: TrainingTrack;
  itemArray: TrainingTrack[];
  currentItem: TrainingTrack;
}
const baseUrl = "/api/trainingTrack/";
export const useTrainingTrackStore = defineStore("TrainingTrackStore", {
  state: (): TrainingTrackStoreState => ({
    itemArray: [],
    currentItem: { id: null, user_id: "", trainingId: 0, duration: 0 },
    defaultItem: { id: null, user_id: "", trainingId: 0, duration: 0 },
    loading: false,
  }),
  getters: {
    getItemArray: (state) => {
      return state.itemArray;
    },
    getCurrentItem: (state) => {
      return state.currentItem;
    },
  },
  actions: {
    resetState() {
      this.$reset();
    },
    resetCurrentItem() {
      this.currentItem = Object.assign({}, this.defaultItem);
    },
    // async getById(id: number) {
    //   withErrorHandling(this)(async (props, store) => {
    //     const response = await $fetch(baseUrl + id, {
    //       method: "get",
    //     });
    //     if (response) {
    //       updateArray(response, this.itemArray);
    //       this.currentItem = response;
    //     }
    //   })(null);
    // },
    // createCurrentItem() {
    //   withErrorHandling(this)(async (payload, store) => {
    //     const response = await $fetch(baseUrl + "create", {
    //       method: "post",
    //       body: { ...store.currentItem },
    //     });

    //     updateArray(response, store.itemArray);

    //     if (response) store.currentItem = response;
    //   })(null);
    // },
    // async fetchAll() {
    //   withErrorHandling(this)(async (props, store) => {
    //     const response = await $fetch(baseUrl + "all", {
    //       method: "get",
    //     });

    //     if (response && response.length > 0) this.itemArray = response;
    //   })(null);
    // },
  },
});

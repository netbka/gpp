import { defineStore } from "pinia";
import { type IProfile, Profile } from "~/types/types";
interface ProfileStoreState {
  //profiles: Profile[];
  currentItem: IProfile;
  loading: boolean;
  accesstoken: string;
  refreshtoken: string;
}
const baseUrl = "/api/profile/";
export const useProfileStore = defineStore("profile", {
  state: (): ProfileStoreState => ({
    currentItem: new Profile().getAll(),
    loading: false,
    accesstoken: "",
    refreshtoken: "",
  }),
  persist: true,
  actions: {
    resetCurrentItem(): void {
      this.currentItem = new Profile().getAll();
    },

    // async fetchAll() {
    //   withErrorHandling(this)(async (props, store) => {
    //     const { data } = await useFetch(baseUrl + "all", {
    //       method: "get",
    //     });
    //     this.profiles = data;
    //   })(null);
    // },
    // async fetchItem(id) {
    //   withErrorHandling(this)(async (props, store) => {
    //     const response = await $fetch(baseUrl + id, {
    //       method: "get",
    //     });
    //     this.profile = response;
    //   })(null);
    // },
    // async fetchCurrentUser() {
    //   withErrorHandling(this)(async (props, store) => {
    //     if (this.currentItem.id !== 0) return;
    //     const response = await $fetch(baseUrl + "current", {
    //       method: "get",
    //     });
    //     if (response !== null) this.currentItem = Object.assign({}, response);
    //   })(null);
    // },
    // async updateCurrentUser() {
    //   withErrorHandling(this)(async (props, store) => {
    //     const response = await $fetch(baseUrl + "current", {
    //       method: "post",
    //       body: { ...this.currentItem },
    //     });
    //   })(null);
    // },
    // async createProfile() {
    //   withErrorHandling(this)(async (props, store) => {
    //     const response = await $fetch(baseUrl + "create", {
    //       method: "post",
    //       body: { ...this.currentItem },
    //     });
    //   })(null);
    // },
  },
});

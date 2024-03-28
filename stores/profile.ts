import { defineStore } from "pinia";
import { type Profile } from "~/types/types";
interface ProfileStoreState {
  profiles: Profile[];
  currentProfile: Profile;
  profile: Profile;
}

export const useProfileStore = defineStore("ProfileStore", {
  state: (): ProfileStoreState => ({
    profiles: [],
    currentProfile: { id: 0, lastName: "", firstName: "", user_id: "", birthDay: null, profilesSportType: [] },
    profile: { id: 0, lastName: "", firstName: "", user_id: "", birthDay: null, profilesSportType: [] },
    loading: false,
  }),

  actions: {
    async fetchAll() {
      withErrorHandling(this)(async (props, store) => {
        const { data } = await useFetch("/api/profile/all", {
          method: "get",
        });
        this.profiles = data;
      })(null);
    },
    async fetchItem(id) {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/profile/" + id, {
          method: "get",
        });
        this.profile = response;
      })(null);
    },
    async fetchCurrentUser() {
      if (this.currentProfile.id !== 0) return;
      const response = await $fetch("/api/profile/current", {
        method: "get",
      });
      if (response !== null) this.currentProfile = Object.assign({}, response);
      // withErrorHandling(this)(async (props, store) => {
      //   if (this.currentProfile.id !== 0) return;
      //   const response = await $fetch("/api/profile/current", {
      //     method: "get",
      //   });
      //   if (response !== null) this.currentProfile = Object.assign({}, response);
      // })(null);
    },
    async updateCurrentUser() {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/profile/current", {
          method: "post",
          body: { ...this.currentProfile },
        });
      })(null);
      try {
      } catch (error) {}
    },
    async createProfile() {
      withErrorHandling(this)(async (props, store) => {
        const response = await $fetch("/api/profile/create", {
          method: "post",
          body: { ...this.currentProfile },
        });
      })(null);
      try {
      } catch (error) {}
    },
  },
});

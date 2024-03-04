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
  }),

  actions: {
    async fetchAll() {
      const { data } = await useFetch("/api/profile/all", {
        method: "get",
      });
      this.profiles = data;
    },
    async fetchItem(id) {
      const { data } = await useFetch("/api/profile/" + id, {
        method: "get",
      });
      this.profile = data;
    },
    async fetchCurrentUser() {
      const { data } = await useFetch("/api/profile/current", {
        method: "get",
      });
      if (data.value !== null) this.currentProfile = Object.assign({}, data.value);
    },
    async updateCurrentUser() {
      try {
        const response = await $fetch("/api/profile/current", {
          method: "post",
          body: { ...this.currentProfile },
        });
        console.log(response);
      } catch (error) {
        //console.log(error);
      }
    },
  },
});

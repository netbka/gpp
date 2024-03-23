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
      const response = await $fetch("/api/profile/" + id, {
        method: "get",
      });
      this.profile = response;
    },
    async fetchCurrentUser() {
      const user = useSupabaseUser();
      //console.log(this.currentProfile);
      //console.log("from store:", user.value);
      if (this.currentProfile.id !== 0) return;
      //console.log(this.currentProfile);
      const response = await $fetch("/api/profile/current", {
        method: "get",
      });
      if (response !== null) this.currentProfile = Object.assign({}, response);
    },
    async updateCurrentUser() {
      try {
        const response = await $fetch("/api/profile/current", {
          method: "post",
          body: { ...this.currentProfile },
        });
      } catch (error) {
        //console.log(error);
      }
    },
  },
});

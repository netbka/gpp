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
    currentProfile: { id: 0, lastName: "", firstName: "", user_id: "", biography: "", birthDay: "", city: "", specialityId: null, speciality: {}, profilesMedicalSubSpecialities: [] },
    profile: { id: 0, lastName: "", firstName: "", user_id: "", biography: "", birthDay: "", city: "", specialityId: null, speciality: {}, profilesMedicalSubSpecialities: [] },
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
      this.currentProfile.biography = this.currentProfile.biography ? this.currentProfile.biography : "";
    },
    async updateCurrentUser() {
      const { data, pending, error, refresh } = await $fetch("/api/profile/current", {
        method: "post",
        body: { ...this.currentProfile },
      });
    },
  },
});

import { defineStore } from "pinia";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    email: "",
    password: "",
    name: "",
    token: "",
    loading: false,
    rowsNumber: 0,
  }),
  actions: {
    
    resetState() {
      this.$reset();
    },
    // async login() {},
    // async register() {},
    // async recover() {},
    // async loginWithSocialProvider(_provider: string) {},
    // async sendPasswordRestEmail() {},
    // async logout() {},
  },
});

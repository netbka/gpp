import { defineStore } from "pinia";

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    email: "",
    password: "",
    name: "",
    token: "",
  }),
  actions: {
    // resetCurrentItem() {
    //   this.email = "";
    //   this.password = "";
    //   this.name = "";
    //   this.token = "";
    // },
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

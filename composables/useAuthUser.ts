const user = ref(null);
import { type CredentialResponse } from "vue3-google-signin";
import Cookies from "js-cookie";
// import { useTokenClient, type AuthCodeFlowSuccessResponse, type AuthCodeFlowErrorResponse } from "vue3-google-signin";

export const useAuthUser = () => {
  const store = useProfileStore();

  const isLoggedIn = () => {
    return store.refreshtoken.length > 0 ? true : false;
  };

  const handleFBLoginSuccess = async (response: CredentialResponse) => {
    const { credential } = response;
    var x = await $fetch(useRuntimeConfig().public.baseUrl + "/auth/GoogleSignIn", {
      method: "POST",
      body: { IdToken: credential },
    }).then(async function (data) {
      setTokens(data.tokens);

      store.currentItem = data.entity;
      await navigateTo("/training");
    });
  };

  const handleFBLoginError = () => {
    console.error("Login failed");
  };

  const login = () => {};
  const loginEmailPassword = async (email, password) => {
    if (data.session) {
      await navigateTo("/training");
    }
  };

  const setTokens = (tokens) => {
    store.refreshtoken = tokens.refreshToken;

    store.accesstoken = tokens.accessToken;
    Cookies.set("RToken", tokens.refreshToken);
    Cookies.set("AToken", tokens.accessToken);
  };
  const getRefreshToken = () => {
    return Cookies.get("RToken");
  };
  const getAccessToken = () => {
    return Cookies.get("AToken");
  };
  const resetTokens = () => {
    store.refreshtoken = "";
    store.accesstoken = "";
    Cookies.remove("RToken");
    Cookies.remove("AToken");
  };

  const loginWithSocialProvider = async (_provider) => {};

  /**
   * Logout
   */
  const logout = async () => {
    store.resetCurrentItem();
    resetTokens();
    const x = await $fetch(useRuntimeConfig().public.baseUrl + "/auth/signout", {
      method: "POST",
    });
    await navigateTo("/auth");
  };

  const refreshToken = async () => {
    var x = await $fetch(useRuntimeConfig().public.baseUrl + "/auth/RefreshToken", {
      method: "POST",
      body: { RefreshToken: getRefreshToken() },
    }).then(async function (data) {
      setTokens(data.tokens);
      store.currentItem.id = data.entity;
    });
    return store.refreshtoken;
  };

  const register = async (email, password) => {};

  const update = async (data) => {};

  const resetPasswordWithToken = async (password, token) => {};

  const sendSignupEmail = async (email) => {
    await navigateTo("/auth/confirm");
  };

  const sendPasswordResetEmail = async (email) => {};

  const getCurrentUserProfile = async () => {
    const id = store.currentItem.id;

    if (id !== null && id !== undefined && store.currentItem.id !== id) {
      const crud = useClientCrud(store);
      const x = await crud.getItem();
    }
  };

  const isAdmin = () => {
    return store.currentItem.admin;
  };
  const currentUserId = () => {
    return store.currentItem.id;
  };
  //  async () => {
  //   console.log(store.currentItem.id);
  //   return store.currentItem.id;
  // };

  // onMounted(async () => {
  //   if (store.currentItem.id === null) await refreshToken();
  // });
  const rtoken = computed(() => store.refreshtoken);
  return {
    rtoken,
    getAccessToken,
    refreshToken,
    isLoggedIn,
    handleFBLoginSuccess,
    handleFBLoginError,

    loginEmailPassword,
    getCurrentUserProfile,
    currentUserId,
    isAdmin,
    //isAdminClient,
    login,
    loginWithSocialProvider,

    logout,
    register,
    update,
    sendPasswordResetEmail,
    sendSignupEmail,
    resetPasswordWithToken,
  };
};

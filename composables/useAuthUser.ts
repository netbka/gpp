const user = ref(null);
import { type CredentialResponse } from "vue3-google-signin";
// import { useTokenClient, type AuthCodeFlowSuccessResponse, type AuthCodeFlowErrorResponse } from "vue3-google-signin";

export const useAuthUser = () => {
  const store = useProfileStore();
  const handleFBLoginSuccess = async (response: CredentialResponse) => {
    const { credential } = response;
    var x = await $fetch(useRuntimeConfig().public.baseUrl + "/auth/GoogleSignIn", {
      method: "POST",
      body: { IdToken: credential },
    }).then(async function (data) {
      setTokens(data.tokens);
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
    localStorage.setItem("accesstoken", tokens.accessToken);
    localStorage.setItem("refreshtoken", tokens.refreshToken);
  };
  const getRefreshToken = () => {
    return localStorage.getItem("refreshtoken");
  };
  const resetTokens = () => {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("refreshtoken");
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

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    // const x = await $fetch(useRuntimeConfig().public.baseUrl + "/auth/RefreshToken", {
    //   method: "POST",
    //   body: { RefreshToken: getRefreshToken() },
    // })
    //   .then(async function (data) {
    //     setTokens(data.tokens);
    //   })
    //   .catch(function (error, any) {
    //     resetTokens();
    //   });
    // console.log(localStorage.getItem("refreshtoken") !== null && localStorage.getItem("refreshtoken").length > 0 ? true : false);
    return localStorage.getItem("refreshtoken") !== null && localStorage.getItem("refreshtoken").length > 0 ? true : false;
  };

  /**
   * Register
   */
  const register = async (email, password) => {};

  const update = async (data) => {};

  const resetPasswordWithToken = async (password, token) => {};

  const sendSignupEmail = async (email) => {
    await navigateTo("/auth/confirm");
  };

  const sendPasswordResetEmail = async (email) => {};

  const isAdmin = computed(() => {
    return user.value?.user_metadata.is_admin === true;
  });

  const getCurrentUserProfile = async () => {
    const id = user.value?.id;

    if (id !== null && id !== undefined && store.currentItem.user_id !== id) {
      const crud = useClientCrud(store);
      const x = await crud.getItem();
      //console.log("Fetching user profile", store.currentItem);
    }
  };

  const currentUserId = () => {
    return user.value?.id;
  };

  return {
    handleFBLoginSuccess,
    handleFBLoginError,

    loginEmailPassword,
    getCurrentUserProfile,
    currentUserId,
    isAdmin,
    //isAdminClient,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordResetEmail,
    sendSignupEmail,
    resetPasswordWithToken,
  };
};

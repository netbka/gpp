const user = ref(null);
import { type CredentialResponse } from "vue3-google-signin";
import Cookies from "js-cookie";
// import { useTokenClient, type AuthCodeFlowSuccessResponse, type AuthCodeFlowErrorResponse } from "vue3-google-signin";

export const useAuthUser = () => {
  const store = useProfileStore();
  const loading = useState("loading", () => false);
  const isLoggedIn = () => {
    return store.refreshtoken.length > 0 ? true : false;
  };

  const handleFBLoginSuccess = async (response: CredentialResponse) => {
    const { credential } = response;
    await $fetch(useRuntimeConfig().public.baseUrl + "/auth/GoogleSignIn", {
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

  const loginEmailPassword = async (email: string, password: string) => {
    await $fetch(useRuntimeConfig().public.baseUrl + "/auth/EmailSignIn", {
      method: "POST",
      body: { email: email, password: password },
    }).then(async function (data) {
      setTokens(data.tokens);
      store.currentItem = data.entity;
      await navigateTo("/training");
    });
  };

  const registerWithEmail = async (email: string, password: string) => {
    await $fetch(useRuntimeConfig().public.baseUrl + "/account/Register", {
      method: "POST",
      body: { email: email, password: password },
    }).then(async function (data) {
      setTokens(data.tokens);
      store.currentItem = data.entity;
      await navigateTo("/training");
    });
  };

  const emailAvailable = async (email: string) => {
    if (email.length === 0) return false;
    return await $fetch(useRuntimeConfig().public.baseUrl + "/account/EmailAvailable", {
      method: "POST",
      body: { email: email },
    }).then(async function (data) {
      console.log(data);
      if (data.found === true) return data.message;
      return true;
    });
  };
  const sendPasswordResetEmail = async (email: string) => {
    loading.value = true;
    if (email.length === 0) return false;
    try {
      await $fetch(useRuntimeConfig().public.baseUrl + "/account/SendPasswordResetEmail", {
        method: "POST",
        body: { email: email },
      }).then(async function (data) {
        await navigateTo("/auth/confirm");
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }

    //await navigateTo("/auth/confirm");
  };

  const resetPasswordWithToken = async (body) => {
    loading.value = true;
    try {
      await $fetch(useRuntimeConfig().public.baseUrl + "/account/ResetPasswordWithToken", {
        method: "POST",
        body: body,
      }).then(async function (data) {
        if (data.success === true) {
          setTokens(data.tokens);
          store.currentItem = data.entity;
          loading.value = false;
          await navigateTo("/training");
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const confirmEmail = async (email: string, token: string) => {
    await $fetch(useRuntimeConfig().public.baseUrl + "/auth/confirmEmail", {
      method: "POST",
      body: { email: email, token: token },
    }).then(async function (data) {
      if (data.success === true) {
        setTokens(data.tokens);
        store.currentItem = data.entity;
        await navigateTo("/training");
      }
    });
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

  const update = async (data) => {};

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

  const rtoken = computed(() => store.refreshtoken);
  return {
    loading,
    confirmEmail,
    emailAvailable,
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
    loginWithSocialProvider,

    logout,
    registerWithEmail,
    update,
    sendPasswordResetEmail,

    resetPasswordWithToken,
  };
};

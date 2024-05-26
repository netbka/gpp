const user = ref(null);

export const useAuthUser = () => {
  const store = useProfileStore();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      if (error.message.includes("Email not confirmed")) {
        notifyMsgNegative("нужно подтвердить почту");
        await navigateTo("/auth/confirm");
      }
      if (error.message.includes("Invalid login credentials")) notifyMsgNegative("в логине/пароле");
    }
    console.log(data);
    if (data.session) {
      await navigateTo("/training");
    }
  };

  const loginWithSocialProvider = async (_provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: _provider,
      options: {
        // queryParams: {
        //   access_type: "offline",
        //   prompt: "consent",
        // },
        //redirectTo,
      },
    });
    if (error) {
    }
  };

  /**
   * Logout
   */
  const logout = async () => {
    store.resetCurrentItem();
    const { error } = await supabase.auth.signOut();
    await navigateTo("/");
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return user.value !== null;
  };

  /**
   * Register
   */
  const register = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // options: {
      //   data: {
      //     name: name,
      //   },
      // },
    });
    if (error) {
      notifyMsgNegative(error.message);
    }
    if (data) {
      await navigateTo("/auth/confirm");
    }
  };

  const update = async (data) => {};

  const resetPasswordWithToken = async (password, token) => {
    const { data, error } = await supabase.auth.updateUser({
      password: password,
      nonce: token,
    });
    if (error) {
      notifyMsgNegative(error.message);
    }
    if (data) {
      await navigateTo("/auth/confirm");
    }
  };

  const sendSignupEmail = async (email) => {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: email,
      options: {
        emailRedirectTo: "/auth/confirm",
      },
    });
    await navigateTo("/auth/confirm");
  };

  const sendPasswordResetEmail = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "/resetpassword",
    });
    if (error) {
      notifyMsgNegative(error.message);
    }
    if (data) {
      await navigateTo("/auth/confirm");
    }
  };

  const isAdmin = computed(() => {
    return store.currentItem.is_admin;
  });

  const getCurrentUserProfile = async () => {
    const id = user.value?.id;
    //console.log("id:", id, "store:", store.currentItem);
    //console.log(id !== null && id !== undefined && store.currentItem.user_id !== id);
    if (id !== null && id !== undefined && store.currentItem.user_id !== id) {
      const crud = useClientCrud(store);
      const x = await crud.getItem();
      //console.log("Fetching user profile", store.currentItem);
    }
  };

  const currentUserId = () => {
    return user.value?.id;
  };

  // watch(
  //   () => supabase.auth.onAuthStateChange,
  //   (val) => {
  //     console.log(val);
  //   },
  //   { deep: true }
  // );

  return {
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

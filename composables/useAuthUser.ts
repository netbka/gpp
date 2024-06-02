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
    // const { data, error } = await supabase.auth.refreshSession();
    // console.log(error, data);
    // console.log(user.value);
    return user.value !== null && user.value !== undefined;
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

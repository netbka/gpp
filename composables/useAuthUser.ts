const user = ref(null);

export const useAuthUser = () => {
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
    if (data.session) await navigateTo("/training");
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
      console.log(error);
    }
  };

  /**
   * Logout
   */
  const logout = async () => {
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

  const isAdmin = () => {
    console.log(user.value?.email === "netbka@gmail.com");
    return user.value?.email === "netbka@gmail.com";
  };
  const currentUserId = () => {
    return user.value?.id;
  };

  return {
    currentUserId,
    isAdmin,
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

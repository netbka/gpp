const user = ref(null);
export const useAuthUser = () => {
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      notifyMsgNegative("в логине или пароле");
    }
    console.log(data);
  };
  const supabase = useSupabaseClient();
  /**
   * Login with google, github, etc
   */
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
  const isLoggedIn = () => {};

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
    console.log(error);
    console.log(data);
  };

  /**
   * Update user email, password, or meta data
   */
  const update = async (data) => {};

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email) => {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: "email@example.com",
      options: {
        emailRedirectTo: "/auth/confirm",
      },
    });
  };

  return {
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
  };
};

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn, currentUserId, refreshToken } = useAuthUser();
  // console.log(to.meta.auth);
  //const user = useSupabaseUser();
  if (currentUserId() === null && isLoggedIn()) refreshToken();

  if (to.meta.auth && !isLoggedIn()) {
    //if (user.value?.id) return navigateTo(to.path);
    //else
    return navigateTo("/auth");
  }
});

export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuthUser();
  // console.log(to.meta.auth);
  //const user = useSupabaseUser();

  if (to.meta.auth && !isLoggedIn()) {
    console.log(to.meta.auth);
    //if (user.value?.id) return navigateTo(to.path);
    //else
    return navigateTo("/auth");
  }
});

export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(to.meta.auth);
  const user = useSupabaseUser();
  //console.log(user);
  if (to.meta.auth && !user.value?.id) {
    //if (user.value?.id) return navigateTo(to.path);
    //else
    return navigateTo("/auth");
  }
});

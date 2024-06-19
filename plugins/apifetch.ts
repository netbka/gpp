export default defineNuxtPlugin((nuxtApp) => {
  // const defaultOptions = {
  //   baseURL: useRuntimeConfig().public.baseUrl,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  // //   nuxtApp.vueApp.use(vue3GoogleLogin, {
  // //     clientId: useRuntimeConfig().public.googleSignIn.clientId,
  // //   });
  // nuxtApp.provide("apiFetch", async (url, options = {}) => {
  //   const mergedOptions = Object.assign({}, defaultOptions, options);
  //   const response = await $fetch(url, mergedOptions);
  //   if (!response.ok) {
  //     throw new Error(`API request failed with status: ${response.status}`);
  //   }
  //   return await response.json();
  // });
});

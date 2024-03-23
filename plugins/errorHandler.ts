export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // handle error, e.g. report to a service
    console.log("From error handler:", error);
    console.log("From error handler:", instance);
    console.log("From error handler:", info);
  };

  // Also possible
  nuxtApp.hook("vue:error", (error, instance, info) => {
    console.log("From error handler vue:error:", error);
    console.log("From error handler vue:error:", instance);
    console.log("From error handler vue:error:", info);
  });
});

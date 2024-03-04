//import { ofetch } from "ofetch";
import { useQuasar } from "quasar";

export default defineNuxtPlugin((nuxtApp) => {
  const $q = useQuasar();
  globalThis.$fetch = $fetch.create({
    async onResponseError({ request, options, response }) {
      try {
        $q.notify({
          type: "negative",
          caption: "Что-то пошло не так.",
          message: "Ошибка: " + response.status,
          timeout: 500,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async onResponse({ request, options, response }) {
      if (options.method === "POST") {
        $q.notify({
          type: "positive",
          caption: "Все ок",
          message: "Сохранил",
          timeout: 500,
        });
      }
    },
  });
});

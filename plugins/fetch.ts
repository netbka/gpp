//import { ofetch } from "ofetch";
import { useQuasar } from "quasar";

export default defineNuxtPlugin((nuxtApp) => {
  const $q = useQuasar();
  globalThis.$fetch = $fetch.create({
    headers: useRequestHeaders(["cookie"]),
    async onResponseError({ request, options, response }) {
      try {
        $q.notify({
          type: "negative",
          caption: "Что-то пошло не так.",
          message: "Ошибка: " + response.status,
          timeout: 500,
        });
      } catch (error) {}
    },
    async onResponse({ request, options, response }) {
      if (!response.ok) return;
      if (options.method === "POST") {
        $q.notify({
          type: "positive",
          caption: "Все ок",
          message: "Создал",
          timeout: 500,
        });
      }

      if (options.method === "PUT") {
        $q.notify({
          type: "positive",
          caption: "Все ок",
          message: "Обновил",
          timeout: 500,
        });
      }
      if (options.method === "PATCH") {
        $q.notify({
          type: "positive",
          caption: "Все ок",
          message: "Обновил значение",
          timeout: 500,
        });
      }
      if (options.method === "DELETE") {
        $q.notify({
          type: "positive",
          caption: "Все ок",
          message: "Удалил",
          timeout: 500,
        });
      }
    },
  });
});

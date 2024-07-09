import { useQuasar } from "quasar";

export default defineNuxtPlugin((nuxtApp) => {
  const $q = useQuasar();
  const { rtoken } = useAuthUser();

  globalThis.$fetch = $fetch.create({
    //headers: useRequestHeaders(["cookie"]),
    headers: {
      ...useRequestHeaders(["cookie"]),
      ...useRequestHeaders(["gpp_i18n"]),
      Authorization: `Bearer ${rtoken.value}`,
    },

    async onResponseError({ request, options, response }) {
      //console.log(response);
      if (response.status === 404) return;
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
      const isAuthRequest = request.toString().includes("auth");

      if (options.method === "POST" && !isAuthRequest) {
        $q.notify({
          type: "positive",
          caption: "Все ок",
          message: response._data.message,
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

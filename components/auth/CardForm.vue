<template>
  <q-card class="q-pa-md" style="max-width: 365px">
    <q-card-section>
      <div class="text-h5 text-center">Вход</div>
      <div class="text-overline text-center">с помощью почты</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pb-sm">
      <q-form @submit="onSubmit">
        <q-input label="Почта" v-model="username" />
        <q-input label="пароль" type="password" v-model="password" />
        <q-btn type="submit" label="Войти" class="full-width q-mt-md" outline />
      </q-form>
    </q-card-section>
    <q-card-actions align="around">
      <q-btn label="Зарегистрироваться" size="sm" to="/auth/register" />
      <q-btn label="Забыл пароль" size="sm" />
    </q-card-actions>
    <q-card-section>
      <q-separator />
      <div class="row q-mt-sm">
        <div class="col">
          <q-btn
            align="between"
            @click="loginGoogle"
            label="Google"
            class="full-width btn_google"
          >
          </q-btn>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-btn
            align="between"
            color="blue"
            @click="loginFacebook"
            label="Facebook"
            class="full-width btn_fb"
          >
          </q-btn>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
const props = defineProps({

  showSocial: {
    type: Boolean,
    default: false,
  },
  heading: {
    type: String,
  }
  subheading: {
    type: String,
  }
});

const supabase = useSupabaseClient();


const loginGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      //redirectTo: baseUrl + "/profile",

      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
      //redirectTo,
    },
  });
  if (error) {
    console.log(error);
  }
};
const loginFacebook = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      //redirectTo: baseUrl + "/workout",
    },
  });
  if (error) {
    console.log(error);
  }
};
const username = ref("");
const password = ref("");
const onSubmit = () => {};
</script>

<style scoped lang="sass">
.btn_fb {
  color: #fff;
  margin-bottom: 10px !important;
  padding-left: 100px !important;
  border-color: #3b5998 !important;
  text-shadow: none !important;
  background-color: #3b5998 !important;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB%2FpwA%2BAAAAGFBMVEUAAAD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8jfp1fAAAAB3RSTlMA7D8UYSuqwY7ItgAAAEdJREFUCNdjUCyHAiEGcRizkKEcDiDMQmeGcChTmIGBHcp0YDBVhzIN2OBqgdIYzAIGIDBHMNURTHcktWQzxWHMQgZFGFMIAFerRr2lTcdCAAAAAElFTkSuQmCC) !important;
  background-position: 10px center !important;
  background-repeat: no-repeat !important;
}
.btn_google {
  min-width: 260px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiICB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BLnN0MHtjbGlwLXBhdGg6dXJsKCNTVkdJRF8yXyk7ZmlsbDojRkJCQzA1O30uc3Qxe2NsaXAtcGF0aDp1cmwoI1NWR0lEXzRfKTtmaWxsOiNFQTQzMzU7fS5zdDJ7Y2xpcC1wYXRoOnVybCgjU1ZHSURfNl8pO2ZpbGw6IzM0QTg1Mzt9LnN0M3tjbGlwLXBhdGg6dXJsKCNTVkdJRF84Xyk7ZmlsbDojNDI4NUY0O308L3N0eWxlPjxkZWZzPjxwYXRoIGlkPSJTVkdJRF8xXyIgZD0iTTU5LjMgMjYuN0g1NiA0NS4xIDMyVjM4aDE1LjdjLTEuNSA3LjItNy42IDExLjMtMTUuNyAxMS4zIC05LjYgMC0xNy4zLTcuNy0xNy4zLTE3LjNTMjIuNCAxNC43IDMyIDE0LjdjNC4xIDAgNy45IDEuNSAxMC44IDMuOWw4LjUtOC41QzQ2LjEgNS41IDM5LjUgMi43IDMyIDIuNyAxNS43IDIuNyAyLjcgMTUuNyAyLjcgMzJTMTUuNyA2MS4zIDMyIDYxLjNjMTQuNyAwIDI4LTEwLjcgMjgtMjkuM0M2MCAzMC4zIDU5LjcgMjguNCA1OS4zIDI2Ljd6Ii8%2BPC9kZWZzPjxjbGlwUGF0aCBpZD0iU1ZHSURfMl8iPjx1c2UgeGxpbms6aHJlZj0iI1NWR0lEXzFfIi8%2BPC9jbGlwUGF0aD48cG9seWdvbiBjbGFzcz0ic3QwIiBwb2ludHM9IjAgNDkuMyAwIDE0LjcgMjIuNyAzMiAiLz48ZGVmcz48cGF0aCBpZD0iU1ZHSURfM18iIGQ9Ik01OS4zIDI2LjdINTYgNDUuMSAzMlYzOGgxNS43Yy0xLjUgNy4yLTcuNiAxMS4zLTE1LjcgMTEuMyAtOS42IDAtMTcuMy03LjctMTcuMy0xNy4zUzIyLjQgMTQuNyAzMiAxNC43YzQuMSAwIDcuOSAxLjUgMTAuOCAzLjlsOC41LTguNUM0Ni4xIDUuNSAzOS41IDIuNyAzMiAyLjcgMTUuNyAyLjcgMi43IDE1LjcgMi43IDMyUzE1LjcgNjEuMyAzMiA2MS4zYzE0LjcgMCAyOC0xMC43IDI4LTI5LjNDNjAgMzAuMyA1OS43IDI4LjQgNTkuMyAyNi43eiIvPjwvZGVmcz48Y2xpcFBhdGggaWQ9IlNWR0lEXzRfIj48dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8zXyIvPjwvY2xpcFBhdGg%2BPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIwIDE0LjcgMjIuNyAzMiAzMiAyMy45IDY0IDE4LjcgNjQgMCAwIDAgIi8%2BPGRlZnM%2BPHBhdGggaWQ9IlNWR0lEXzVfIiBkPSJNNTkuMyAyNi43SDU2IDQ1LjEgMzJWMzhoMTUuN2MtMS41IDcuMi03LjYgMTEuMy0xNS43IDExLjMgLTkuNiAwLTE3LjMtNy43LTE3LjMtMTcuM1MyMi40IDE0LjcgMzIgMTQuN2M0LjEgMCA3LjkgMS41IDEwLjggMy45bDguNS04LjVDNDYuMSA1LjUgMzkuNSAyLjcgMzIgMi43IDE1LjcgMi43IDIuNyAxNS43IDIuNyAzMlMxNS43IDYxLjMgMzIgNjEuM2MxNC43IDAgMjgtMTAuNyAyOC0yOS4zQzYwIDMwLjMgNTkuNyAyOC40IDU5LjMgMjYuN3oiLz48L2RlZnM%2BPGNsaXBQYXRoIGlkPSJTVkdJRF82XyI%2BPHVzZSB4bGluazpocmVmPSIjU1ZHSURfNV8iLz48L2NsaXBQYXRoPjxwb2x5Z29uIGNsYXNzPSJzdDIiIHBvaW50cz0iMCA0OS4zIDQwIDE4LjcgNTAuNSAyMCA2NCAwIDY0IDY0IDAgNjQgIi8%2BPGRlZnM%2BPHBhdGggaWQ9IlNWR0lEXzdfIiBkPSJNNTkuMyAyNi43SDU2IDQ1LjEgMzJWMzhoMTUuN2MtMS41IDcuMi03LjYgMTEuMy0xNS43IDExLjMgLTkuNiAwLTE3LjMtNy43LTE3LjMtMTcuM1MyMi40IDE0LjcgMzIgMTQuN2M0LjEgMCA3LjkgMS41IDEwLjggMy45bDguNS04LjVDNDYuMSA1LjUgMzkuNSAyLjcgMzIgMi43IDE1LjcgMi43IDIuNyAxNS43IDIuNyAzMlMxNS43IDYxLjMgMzIgNjEuM2MxNC43IDAgMjgtMTAuNyAyOC0yOS4zQzYwIDMwLjMgNTkuNyAyOC40IDU5LjMgMjYuN3oiLz48L2RlZnM%2BPGNsaXBQYXRoIGlkPSJTVkdJRF84XyI%2BPHVzZSB4bGluazpocmVmPSIjU1ZHSURfN18iLz48L2NsaXBQYXRoPjxwb2x5Z29uIGNsYXNzPSJzdDMiIHBvaW50cz0iNjQgNjQgMjIuNyAzMiAxNy4zIDI4IDY0IDE0LjcgIi8%2BPC9zdmc%2BCg%3D%3D) !important;
  background-position: 10px center !important;
  background-repeat: no-repeat !important;
  background-size: 24px !important;
  margin-bottom: 20px !important;
  padding-left: 110px !important;
  text-shadow: none !important;

  border-width: 1px;
  border-color: grey !important;
  border-style: ridge;
}
</style>

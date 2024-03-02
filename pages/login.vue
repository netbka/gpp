<template>
  <q-page class="flex flex-center items-center justify-center back_main">
    <q-card class="q-pa-md" style="width: 500px">
      <q-card-section>
        <div class="text-h5 text-center">Вход</div>
        <div class="text-overline text-center">с помощью почты</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input label="логин" v-model="username" />
          <q-input label="пароль" type="password" v-model="password" />
          <q-btn type="submit" label="Войти" class="full-width q-mt-md" outline />
        </q-form>

        <q-card-section>
          <q-separator />
          <div class="row q-col-gutter-md q-mt-xs">
            <div class="col">
              <q-btn
                color="blue-5"
                outline
                @click="loginGoogle"
                label="Google"
                class="full-width"
                icon="fa-brands fa-google"
              >
              </q-btn>
            </div>
            <div class="col">
              <q-btn
                outline
                color="blue"
                @click="loginFacebook"
                label="Facebook"
                align="between"
                class="full-width"
                icon="fa-brands fa-facebook"
              >
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
//import google from "/google-icon.svg";
definePageMeta({
  layout: "auth",
});

const supabase = useSupabaseClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
//const { query } = useRoute();
const user = useSupabaseUser();

// watchEffect(async () => {
//   if (user.value) {
//     console.log(user.value);
//     await navigateTo(query.redirectTo as string, {
//       replace: true,
//     });
//   }
// });

const loginGithub = async () => {
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:3000";
  } else {
    baseUrl = "https://myofp.netlify.app/";
  }
  //console.log(redirectTo);
  //const host = `${window.location.origin}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: baseUrl + "/exercise",
    },
  });
  if (error) {
    console.log(error);
  }
};
// const loginGithub = async () => {
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: {
//       redirectTo: "http://localhost:3000/profile",
//     },
//   });
//   if (error) {
//     console.log(error);
//   }
// };

const loginGoogle = async () => {
  //const redirectTo = `${window.location.origin}${query.redirectTo}`;
  //console.log(redirectTo);
  let baseUrl = "https://myofp.netlify.app/";
  if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:3000";
  } else {
    baseUrl = "https://myofp.netlify.app/";
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: baseUrl + "/exercise",

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
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:3000";
  } else {
    baseUrl = "https://myofp.netlify.app/";
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: baseUrl + "/exercise",
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

<style scoped></style>

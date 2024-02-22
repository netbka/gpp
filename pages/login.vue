<template>
  <q-page class="flex flex-center items-center justify-center back_main">
    <q-card class="q-pa-md" style="width: 500px">
      <q-card-section>
        <div class="text-h5 text-center">Login</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input label="Username" v-model="username" />
          <q-input label="Password" type="password" v-model="password" />
          <q-btn type="submit" label="Login" class="full-width q-mt-md" />
        </q-form>

        <div class="row col-gutter-sm">
          <div class="col">
            <q-btn
              outline
              @click="loginGithub"
              label="GitHub"
              align="between"
              class="btn-fixed-width"
              icon="fa-brands fa-github"
            >
            </q-btn>
          </div>
          <div class="col">
            <q-btn
              color="blue-5"
              outline
              @click="loginGoogle"
              label="Google"
              align="between"
              class="btn-fixed-width"
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
              class="btn-fixed-width"
              icon="fa-brands fa-facebook"
            >
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
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
    baseUrl = "https://drnow.netlify.app/";
  }
  //console.log(redirectTo);
  //const host = `${window.location.origin}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: baseUrl + "/profile",
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
  const host = `${window.location.origin}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: host + "/profile",

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
  const host = `${window.location.origin}`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: host + "/profile",
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

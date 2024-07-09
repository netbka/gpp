<template>
  <div>
    <ClientOnly>
      <AuthCardForm
        :heading="$t('auth.resetpassword.heading')"
        :subheading="$t('auth.resetpassword.subheading')"
        @onSubmit="onSubmit"
      >
        <q-input
          lazy-rules
          :label="$t('auth.resetpassword.email')"
          v-model="store.email"
          :rules="[
            (val) =>
              validateEmail(val) ||
              emailAvailable(val) ||
              $t('auth.resetpassword.error_email'),
          ]"
        />

        <q-input
          lazy-rules
          :label="$t('auth.resetpassword.newpassword')"
          type="password"
          v-model="store.password"
          :rules="[
            (val) => (!!val && val.length > 5) || $t('auth.resetpassword.error_password'),
          ]"
        />
        <q-input
          lazy-rules
          label="Token"
          v-model="store.token"
          :rules="[
            (val) => (!!val && val.length > 10) || $t('auth.resetpassword.error_token'),
          ]"
        />
        <q-btn
          type="submit"
          :label="$t('auth.resetpassword.reset')"
          class="full-width q-mt-md"
          outline
        />
        <template #actions>
          <q-btn
            :label="$t('auth.resetpassword.enter')"
            :to="localePath('/auth')"
            size="sm"
          />
        </template>
      </AuthCardForm>
      <q-inner-loading :showing="loading">
        <q-spinner-box size="100px" color="primary" />
        <div class="text-h3">{{ $t("auth.resetpassword.saving") }}</div>
      </q-inner-loading>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  auth: false,
  title: "Регистрация",
  description: "Страница сброса пароля",
});
const route = useRoute();
const store = authStore();
store.token = route.query.Token;
store.email = route.query.Email;
const { resetPasswordWithToken, loading } = useAuthUser();
const onSubmit = () => {
  resetPasswordWithToken(store);
};
//netbka@gmail.com
//validateEmail(val) ||
</script>

<style scoped></style>

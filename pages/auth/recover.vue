<template>
  <div>
    <AuthCardForm
      :heading="$t('auth.recover.heading')"
      :subheading="$t('auth.recover.subheading')"
      @onSubmit="onSubmit"
      :showSocial="false"
    >
      <q-input
        lazy-rules
        :label="$t('auth.form.email')"
        v-model="store.email"
        :rules="[(val) => validateEmail(val) || $t('auth.recover.error_email')]"
      />

      <q-btn
        type="submit"
        :label="$t('auth.recover.email')"
        class="full-width q-mt-md"
        outline
      />
      <template #actions>
        <q-btn
          :label="$t('auth.recover.registerBtn')"
          size="sm"
          :to="localePath('/auth/register')"
        />
        <q-btn :label="$t('auth.recover.sign_in')" :to="localePath('/auth')" size="sm" />
      </template>
    </AuthCardForm>
    <q-inner-loading :showing="loading">
      <q-spinner-box size="100px" color="primary" />
      <div class="text-h3">{{ $t("auth.recover.sending") }}</div>
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  auth: false,
  title: "Регистрация",
  description: "Страница регистрации в сервисе",
});

const store = authStore();
const { sendPasswordResetEmail, loading } = useAuthUser();
const onSubmit = async () => {
  await sendPasswordResetEmail(store.email, store.password);
};
</script>

<style scoped></style>

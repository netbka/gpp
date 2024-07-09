<template>
  <div>
    <ClientOnly>
      <AuthCardForm
        :heading="$t('auth.register.heading')"
        :subheading="$t('auth.register.subheading')"
        @onSubmit="onSubmit"
      >
        <q-input
          lazy-rules
          :label="$t('auth.register.email')"
          v-model="store.email"
          :rules="[
            (val) =>
              validateEmail(val) ||
              emailAvailable(val) ||
              $t('auth.register.error_email'),
          ]"
        />
        <q-input
          lazy-rules
          :label="$t('auth.register.password')"
          type="password"
          v-model="store.password"
          :rules="[
            (val) => (!!val && val.length > 5) || $t('auth.register.error_password'),
          ]"
        />
        <q-btn
          type="submit"
          :label="$t('auth.register.registration')"
          class="full-width q-mt-md"
          outline
        />
        <template #actions>
          <q-btn
            :label="$t('auth.register.forgot_password')"
            :to="localePath('/auth/recover')"
            size="sm"
          />
        </template>
      </AuthCardForm>
    </ClientOnly>
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
const { registerWithEmail, emailAvailable } = useAuthUser();
const onSubmit = () => {
  registerWithEmail(store.email, store.password);
};
//netbka@gmail.com
//validateEmail(val) ||
</script>

<style scoped></style>

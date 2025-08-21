<template>
  <div>
    <ClientOnly>
      <AuthCardForm
        :heading="$t('auth.form.heading')"
        :subheading="$t('auth.form.subheading')"
        @onSubmit="onSubmit"
      >
        <q-input
          lazy-rules
          :label="$t('auth.form.email')"
          v-model="store.email"
          :rules="[(val) => validateEmail(val) || $t('auth.form.error_email')]"
        />
        <q-input
          lazy-rules
          :label="$t('auth.form.password')"
          type="password"
          v-model="store.password"
          :rules="[(val) => !!val || $t('auth.form.error_password')]"
        />
        <q-btn
          type="submit"
          :label="$t('auth.form.enterBtn')"
          class="full-width q-mt-md"
          outline
        />
        <template #actions>
          <q-btn
            :label="$t('auth.form.registerBtn')"
            size="sm"
            :to="$localePath('/auth/register')"
          />
          <q-btn
            :label="$t('auth.form.forgotBtn')"
            :to="$localePath('/auth/recover')"
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
  title: "Вход в систему",
  description: "Страница для авторизации",
});

const store = authStore();
const { loginEmailPassword } = useAuthUser();
const onSubmit = async () => {
  await loginEmailPassword(store.email, store.password);
};
</script>

<style scoped></style>

<template>
  <div>
    <AuthCardForm
      heading="Восстановить доступ"
      subheading="с помощью почты"
      @onSubmit="onSubmit"
      :showSocial="false"
    >
      <q-input
        lazy-rules
        label="Почта"
        v-model="store.email"
        :rules="[(val) => validateEmail(val) || 'ошибка формата email ']"
      />

      <q-btn type="submit" label="Отправить пароль" class="full-width q-mt-md" outline />
      <template #actions>
        <q-btn label="Зарегистрироваться" size="sm" to="/auth/register" />
        <q-btn label="Войти" to="/auth" size="sm" />
      </template>
    </AuthCardForm>
    <q-inner-loading :showing="loading">
      <q-spinner-box size="100px" color="primary" />
      <div class="text-h3">Отправляю...</div>
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

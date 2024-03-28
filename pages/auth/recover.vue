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
const { sendPasswordResetEmail } = useAuthUser();
const onSubmit = async () => {
  await sendPasswordResetEmail(store.email, store.password);
};
</script>

<style scoped></style>

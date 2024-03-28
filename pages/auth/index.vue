<template>
  <div>
    <ClientOnly>
      <AuthCardForm heading="Вход" subheading="с помощью почты" @onSubmit="onSubmit">
        <q-input
          lazy-rules
          label="Почта"
          v-model="store.email"
          :rules="[(val) => validateEmail(val) || 'ошибка формата email ']"
        />
        <q-input
          lazy-rules
          label="пароль"
          type="password"
          v-model="store.password"
          :rules="[(val) => !!val || 'нужно указать пароль']"
        />
        <q-btn type="submit" label="Войти" class="full-width q-mt-md" outline />
        <template #actions>
          <q-btn label="Зарегистрироваться" size="sm" to="/auth/register" />
          <q-btn label="Забыл пароль" to="/auth/recover" size="sm" />
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
const { login } = useAuthUser();
const onSubmit = async () => {
  await login(store.email, store.password);
};
</script>

<style scoped></style>

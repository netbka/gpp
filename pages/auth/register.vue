<template>
  <div>
    <ClientOnly>
      <AuthCardForm
        heading="Регистрация"
        subheading="с помощью почты"
        @onSubmit="onSubmit"
      >
        <q-input
          lazy-rules
          label="Почта"
          v-model="store.email"
          :rules="[
            (val) => validateEmail(val) || emailAvailable(val) || 'ошибка формата email ',
          ]"
        />
        <q-input
          lazy-rules
          label="пароль"
          type="password"
          v-model="store.password"
          :rules="[
            (val) => (!!val && val.length > 5) || 'минимальная длина пароля 6 символов',
          ]"
        />
        <q-btn type="submit" label="Регистрация" class="full-width q-mt-md" outline />
        <template #actions>
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

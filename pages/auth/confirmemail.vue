<template>
  <div>
    <ClientOnly>
      <AuthCardForm
        heading="Подтверждение почты"
        subheading="с помощью token"
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
          label="Token"
          v-model="store.token"
          :rules="[(val) => (!!val && val.length > 5) || 'укажите token из письма']"
        />
        <q-btn
          type="submit"
          label="Подтвердить почту"
          class="full-width q-mt-md"
          outline
        />
        <template #actions>
          <q-btn label="На вход" to="/auth" size="sm" />
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
  description: "Страница сброса пароля",
});
const route = useRoute();
const store = authStore();
store.token = route.query.Token;
store.email = route.query.Email;
const { confirmEmail } = useAuthUser();
const onSubmit = () => {
  confirmEmail(store);
};
//netbka@gmail.com
//validateEmail(val) ||
</script>

<style scoped></style>

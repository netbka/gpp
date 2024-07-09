<template>
  <div>
    <ClientOnly>
      <AuthCardForm
        :heading="$t('auth.confirmemail.heading')"
        :subheading="$t('auth.confirmemail.subheading')"
        @onSubmit="onSubmit"
      >
        <q-input
          lazy-rules
          :label="$t('auth.confirmemail.email')"
          v-model="store.email"
          :rules="[
            (val) =>
              validateEmail(val) ||
              emailAvailable(val) ||
              $t('auth.confirmemail.error_email'),
          ]"
        />

        <q-input
          lazy-rules
          label="Token"
          v-model="store.token"
          :rules="[
            (val) => (!!val && val.length > 5) || $t('auth.confirmemail.error_token'),
          ]"
        />
        <q-btn
          type="submit"
          :label="$t('auth.confirmemail.confirm')"
          class="full-width q-mt-md"
          outline
        />
        <template #actions>
          <q-btn
            :label="$t('auth.confirmemail.enter')"
            :to="localePath('/auth')"
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

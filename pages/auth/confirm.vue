<template>
  <div>
    <AuthCardForm
      heading="Письмо направлено "
      :subheading="`на ${store.email} `"
      :showSocial="false"
    >
      <div class="text-body2 text-center">
        Проверьте свою почту и следуйте инструкции в письме. Все просто ).
      </div>
      <q-btn label="Войти" to="/auth" size="lg" class="full-width q-mt-md" outline />
    </AuthCardForm>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth",
  auth: false,
  title: "Письмо отправлено",
  description: "",
});
const store = authStore();
</script>

<style></style>

<template>
  <div>
    <AuthCardForm
      :heading="$t('auth.confirm.heading')"
      :subheading="`${$t('auth.confirm.subheading')} ${store.email}`"
      :showSocial="false"
    >
      <div class="text-body2 text-center">
        {{ $t("auth.confirm.text") }}
      </div>
      <q-btn
        :label="$t('auth.confirm.enter')"
        :to="localePath('/auth')"
        size="lg"
        class="full-width q-mt-md"
        outline
      />
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

<template>
  <q-card class="card-error absolute-center">
    <q-card-section>
      <div class="text-h2 text-center text-bold">Oooops. Что-то пошло не так</div>

      <div class="text-h3 text-center q-mb-lg">Ошибка: {{ error.statusCode }}</div>
      <div class="text-h5 text-center">{{ error }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pb-sm"> </q-card-section>
    <q-card-actions align="around">
      <q-btn label="На главную" outline size="lg" @click="handleClearError" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: {
    type: {},
  },
});

const handleClearError = () => clearError({ redirect: "/" });
</script>

<style></style>

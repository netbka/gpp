<template>
  <q-card class="card-error absolute-center">
    <q-card-section>
      <div class="text-h2 text-center text-bold">Oooops. Client Error</div>

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
//defineProps(["error"]);
const props = defineProps({
  error: {
    type: {},
  },
});

// const handleClearError = async (error) => {
//   await navigateTo("/");
//   error.value = null;
// };
const handleClearError = () => clearError({ redirect: "/" });
</script>

<style></style>

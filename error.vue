<template>
  <div
    class="mt-7 bg-grey p-6 max-w-sm mx-auto text-center card border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-700"
  >
    <p class="mt-7 text-7x1 font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6x1">Oooops. Something went wrong</p>
    <p class="mt-7 mb-7">{{ error.message }}</p>
    <button class="btn" @click="handleClearError">Go Home..</button>
  </div>
</template>

<script setup>
defineProps(["error"]);
const handleClearError = () => clearError({ redirect: "/" });
</script>

<style></style>

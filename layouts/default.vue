<template>
  <q-layout view="hHh lpR fFf">
    <LayoutNavbar />
    <q-page-container class="">
      <q-page class="" :style-fn="customstyle">
        <!-- <NuxtErrorBoundary>
          <NuxtPage /> -->
        <!-- <template #error="{ error }">
            <p>
              Что-то пошло не так
              <code>{{ error }}</code>
            </p>
            <p>
              <button
                class="hover:cursor-pointer bg-gray-500 text-white font-bold py-1 px-3 rounded"
                @click="resetError(error)"
              >
                Reset
              </button>
            </p>
          </template> -->
        <slot></slot>
        <!-- </NuxtErrorBoundary> -->
      </q-page>
    </q-page-container>
    <LayoutFooter />
  </q-layout>
</template>
<script setup>
const customstyle = (offset, additionalStyles = {}) => {
  const baseStyles = {
    minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh",
  };
  const leftPadding = { paddingLeft: "calc((100vw - 1439px) / 2)" };
  const rightPadding = { paddingRight: "calc((100vw - 1439px) / 2)" };
  const combinedStyles = {
    ...baseStyles,
    ...additionalStyles,
    ...leftPadding,
    ...rightPadding,
  };
  return combinedStyles;
};

</script>

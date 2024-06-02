<template>
  <q-layout view="hHh lpR fFf">
    <LayoutNavbar />
    <q-page-container class>
      <q-page class="flex flex-center items-center justify-center back_main">
        <q-card class="card-error absolute-center">
          <q-card-section>
            <div class="text-h2 text-center text-bold">Oooops.</div>

            <div class="text-h3 text-center q-mb-lg">
              Код ошибки: {{ error.statusCode }}
            </div>
            <div class="text-h5 text-center">Ошибка: {{ error.message }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pb-sm"> </q-card-section>
          <q-card-actions align="around">
            <q-btn label="На главную" outline size="lg" @click="handleClearError" />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
    <LayoutFooter />
  </q-layout>
</template>

<script setup>
defineProps(["error"]);
const handleClearError = () => clearError({ redirect: "/" });

// const customstyle = (offset, additionalStyles = {}) => {
//   const baseStyles = {
//     minHeight: offset ? `calc(100vh - ${offset}px)` : "100vh",
//   };
//   const leftPadding = { paddingLeft: "calc((100vw - 1439px) / 2)" };
//   const rightPadding = { paddingRight: "calc((100vw - 1439px) / 2)" };
//   const combinedStyles = {
//     ...baseStyles,
//     ...additionalStyles,
//     ...leftPadding,
//     ...rightPadding,
//   };
//   return combinedStyles;
// };
</script>

<style></style>

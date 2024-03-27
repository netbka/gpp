<template>
  <q-layout view="hHh lpR fFf">
    <LayoutNavbar />
    <q-page-container class="">
      <q-page class="flex flex-center items-center justify-center back_main">
        <slot></slot>
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
  const leftPadding = { paddingLeft: "calc((100vw - 1536px) / 2)" };
  const rightPadding = { paddingRight: "calc((100vw - 1536px) / 2)" };
  const combinedStyles = {
    ...baseStyles,
    ...additionalStyles,
    ...leftPadding,
    ...rightPadding,
  };
  return combinedStyles;
};
</script>

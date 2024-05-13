<template>
  <q-layout view="hHh lpR fFf">
    <LayoutNavbar />
    <q-page-container class="">
      <q-page class="" :style-fn="customstyle">
        <slot></slot>
      </q-page>
    </q-page-container>
    <LayoutFooter />
  </q-layout>
</template>
<script setup>
// useServerHead({
//   titleTemplate: (titleChunk) => {
//     return titleChunk ? `${titleChunk} - Site Title` : "Site Title";
//   },
// });
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

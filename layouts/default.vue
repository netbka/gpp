<template>
  <q-layout view="hHh lpR fFf">
    <LayoutNavbar />
    <q-page-container class="">
      <q-page class="" :style-fn="customstyle">
        <!-- <q-page
        class="fit row wrap justify-center items-start content-start"
        :style-fn="customstyle"
      > -->
        <!-- <div style="min-width: 1280px; max-width: 1280px"> -->

        <slot></slot>
      </q-page>
    </q-page-container>
    <LayoutFooter />
  </q-layout>
</template>
<script setup>
const customstyle = (offset, additionalStyles = {}) => {
  return {};
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

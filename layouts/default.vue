<template>
  <q-layout view="hHh lpR fFf">
    <LayoutNavbar />
    <q-page-container
      class="full-width row wrap justify-center items-start content-start"
    >
      <!-- <div style="min-width: 1280px; max-width: 1280px"> -->
      <div class="container">
        <slot></slot>
      </div>
    </q-page-container>
    <LayoutFooter />
  </q-layout>
</template>

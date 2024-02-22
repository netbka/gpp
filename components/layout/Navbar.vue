<template>
  <q-header reveal elevated class="bg-primary text-accent">
    <q-toolbar class="">
      <q-toolbar-title class="">
        <a href="/"
          ><q-avatar> <img :src="logo" /> </q-avatar
        ></a>
        DRNOW
      </q-toolbar-title>

      <LayoutNavBarMenu></LayoutNavBarMenu>
      <q-separator dark vertical />
      <q-btn stretch flat label="Link" />
      <q-separator dark vertical />
      <q-btn stretch flat label="Link" />
      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import logo from "/logosmall.png";
</script>

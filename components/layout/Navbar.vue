<template>
  <q-header reveal elevated class="bg-white text-primary">
    <q-toolbar class="m-l">
      <q-toolbar-title>
        <q-avatar> <img :src="logo" /> </q-avatar>
        ЖПП
      </q-toolbar-title>

      <LayoutNavBarMenu></LayoutNavBarMenu>
      <q-separator dark vertical />
      <q-btn stretch flat label="Link" />
      <q-separator dark vertical />
      <q-btn stretch flat label="Link" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import logo from "/logo110.png";
</script>

<template>
  <q-header reveal elevated class="bg-white text-primary">
    <q-toolbar class="m-l">
      <q-toolbar-title>
        <q-avatar @click="redirect">
          <img :src="logo" class="cursor-pointer" />
        </q-avatar>
        <span class="text-weight-thin logo-text">Просто ОФП</span>
      </q-toolbar-title>

      <q-separator dark vertical class="gt-xs" />
      <q-btn stretch flat label="Мои планы" @click="redirectPlan" class="gt-xs" />
      <q-btn stretch flat label="Тренировки" @click="redirectEx" class="gt-xs" />
      <q-separator dark vertical class="gt-xs" />
      <LayoutNavLogin></LayoutNavLogin>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import logo from "/logo110.png";
const redirect = async () => {
  await navigateTo({ path: "/" });
};
const redirectEx = async () => {
  await navigateTo({ path: "/workout" });
};

const redirectPlan = async () => {
  await navigateTo({ path: "/plan" });
};
</script>
<style scoped>
.logo-text {
  letter-spacing: -1px;
}
</style>

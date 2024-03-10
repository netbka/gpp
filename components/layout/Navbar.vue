<template>
  <q-header reveal elevated class="bg-white text-primary">
    <q-toolbar class="m-l">
      <q-toolbar-title>
        <q-avatar @click="redirect">
          <img :src="logo" class="cursor-pointer" />
        </q-avatar>
        <span class="text-weight-thin logo-text gt-xs">Просто ОФП</span>
      </q-toolbar-title>

      <q-separator dark vertical class="gt-xs" />
      <q-btn stretch flat label="Мои планы" @click="redirectTraining" class="gt-xs" />
      <q-btn stretch flat label="Тренировки" @click="redirectEx" class="gt-xs" />
      <q-separator dark vertical class="gt-xs" />
      <ClientOnly>
        <LayoutNavLogin></LayoutNavLogin>
      </ClientOnly>
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

const redirectTraining = async () => {
  await navigateTo({ path: "/training" });
};
</script>
<style scoped>
.logo-text {
  letter-spacing: -1px;
}
</style>

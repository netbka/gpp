<template>
  <q-header reveal elevated class="bg-white text-primary" style="z-index: 1">
    <q-toolbar class="m-l">
      <q-toolbar-title>
        <q-avatar @click="redirect">
          <img :src="logo" class="cursor-pointer" />
        </q-avatar>
        <span class="text-weight-thin text-uppercase gt-sm logo-text">Просто ОФП</span>
      </q-toolbar-title>

      <q-separator dark vertical class="gt-xs" />

      <q-btn stretch flat @click="redirectExerciseTemplate" icon="fitness_center">
        <span class="gt-sm"> упражнения</span>
      </q-btn>
      <q-btn stretch flat @click="redirectTraining" icon="bolt">
        <span class="gt-sm">Тренировки</span>
      </q-btn>
      <!-- <q-btn stretch flat @click="redirectEx" icon="outlined_flag">
          <span class="gt-sm">Планы пользователей </span>
        </q-btn> -->
      <q-separator dark vertical class="gt-xs" />
      <ClientOnly>
        <LayoutNavLogin></LayoutNavLogin>
      </ClientOnly>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import logo from "/logo110.png";
const redirectExerciseTemplate = async () => {
  await navigateTo({ path: "/exercisetemplate" });
};
const redirect = async () => {
  await navigateTo({ path: "/" });
};
// const redirectEx = async () => {
//   await navigateTo({ path: "/workout" });
// };

const redirectTraining = async () => {
  await navigateTo({ path: "/training" });
};
</script>
<style scoped>
.logo-text {
  letter-spacing: -2px;
}
</style>

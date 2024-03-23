<template>
  <q-header reveal elevated class="bg-white text-primary" style="z-index: 1">
    <q-toolbar class="m-l">
      <q-toolbar-title>
        <q-avatar @click="redirect">
          <img :src="logo" class="cursor-pointer" />
        </q-avatar>
        <span class="text-weight-thin logo-text gt-xs">Просто ОФП</span>
      </q-toolbar-title>

      <q-separator dark vertical class="gt-xs" />
      <q-btn
        stretch
        flat
        @click="redirectExerciseTemplate"
        icon="fitness_center"
        v-if="user"
      >
        <span class="gt-xs">Мои упражнения</span>
      </q-btn>
      <q-btn stretch flat @click="redirectTraining" icon="rocket_launch" v-if="user">
        <span class="gt-xs">Мои планы</span>
      </q-btn>
      <q-btn stretch flat @click="redirectEx" icon="outlined_flag">
        <span class="gt-xs">Планы пользователей </span>
      </q-btn>
      <q-separator dark vertical class="gt-xs" />
      <ClientOnly>
        <LayoutNavLogin></LayoutNavLogin>
      </ClientOnly>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
import logo from "/logo110.png";
const redirectExerciseTemplate = async () => {
  await navigateTo({ path: "/exercisetemplate" });
};
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

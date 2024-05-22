<template>
  <span data-nosnippet>
    <q-header reveal elevated class="bg-white text-primary" style="z-index: 1">
      <q-toolbar class="m-l">
        <q-toolbar-title>
          <span data-nosnippet>
            <q-avatar @click="redirect">
              <img
                :src="websitelogo()"
                class="cursor-pointer"
                data-nosnippet
                alt="Логотип Просто ОФП"
              />
            </q-avatar>
          </span>
          <h1 class="text-weight-thin text-uppercase logo-text">Просто ОФП</h1>
        </q-toolbar-title>

        <q-separator dark vertical class="gt-xs" />
        <NuxtLink class="no-style text-uppercase q-px-md" to="/exercisetemplate">
          <q-icon name="img:/icons/exercise.svg" size="sm"></q-icon>
          <span class="gt-sm" data-nosnippet>Упражнения</span></NuxtLink
        >
        <NuxtLink class="no-style text-uppercase q-px-md" to="/training">
          <q-icon name="img:/icons/training.svg" size="sm"></q-icon>
          <span class="gt-sm" data-nosnippet>Тренировки</span></NuxtLink
        >

        <q-separator dark vertical class="gt-xs" />
        <ClientOnly>
          <LayoutNavLogin></LayoutNavLogin>
        </ClientOnly>
      </q-toolbar>
    </q-header>
  </span>
</template>

<script lang="ts" setup>
//import logo from "/logo110.png";
const redirectExerciseTemplate = async () => {
  await navigateTo({ path: "/exercisetemplate" });
};
const redirect = async () => {
  await navigateTo({ path: "/" });
};
const redirectTraining = async () => {
  await navigateTo({ path: "/training" });
};
</script>
<style scoped>
.logo-text {
  letter-spacing: -2px;
  font-size: 21px;
  line-height: 32px;
  display: inline;
}
</style>

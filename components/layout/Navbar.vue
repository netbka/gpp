<template>
  <span data-nosnippet>
    <q-header reveal elevated class="bg-white text-primary" style="z-index: 1">
      <q-toolbar class="m-l">
        <q-toolbar-title>
          <span data-nosnippet>
            <NuxtLinkLocale class="no-style" to="/">
              <q-avatar>
                <img
                  :src="websitelogo()"
                  class="cursor-pointer"
                  data-nosnippet
                  alt="Logo OFP"
                />
              </q-avatar>
            </NuxtLinkLocale>
          </span>
          <h1 class="text-weight-thin text-uppercase logo-text gt-xs">
            {{ $t("navbar.title") }}
          </h1>
        </q-toolbar-title>

        <q-separator dark vertical class="gt-xs" />
        <a href="https://t.me/prostoofp" target="_blank"
          ><q-icon name="img:/icons/telegram-icon.svg" size="md"></q-icon
        ></a>
        <NuxtLinkLocale class="no-style text-uppercase q-px-md" to="/exercisetemplate">
          <q-icon name="img:/icons/exercise.svg" size="sm"></q-icon>
          <span class="gt-sm" data-nosnippet>{{
            $t("navbar.exercise")
          }}</span></NuxtLinkLocale
        >
        <NuxtLinkLocale class="no-style text-uppercase q-px-md" to="/training">
          <q-icon name="img:/icons/training.svg" size="sm"></q-icon>
          <span class="gt-sm" data-nosnippet>{{
            $t("navbar.training")
          }}</span></NuxtLinkLocale
        >
        <q-separator dark vertical class="gt-xs" />
        <LayoutLangSwitch></LayoutLangSwitch>
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
const redirect = async () => {
  await navigateTo({ path: "/" });
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

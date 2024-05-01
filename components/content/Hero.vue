<template>
  <div class="hero-wrapper">
    <div class="hero-overlay">
      <div :style="{ backgroundImage: 'url(' + hero + ')' }" class="hero-image"></div>
    </div>
    <div class="hero-text text-center">
      <h1>{{ header }}</h1>
      <h2 class="text-weight-thin text-h4 q-mb-none hero-text-line-height">
        {{ subHeading }}
      </h2>
      <h2 class="text-weight-thin text-h4 q-mt-none hero-text-line-height">
        {{ subHeading2 }}
      </h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();

import hero from "~/public/build_transparent_300.png";
const props = defineProps({
  header: { Type: String, default: false },
  subHeading: { Type: String, default: "" },
  subHeading2: { Type: String, default: "" },
});
</script>

<style scoped>

</style>

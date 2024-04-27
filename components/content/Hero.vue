<template>
  <div class="hero-wrapper">
    <div class="overlay">
      <div :style="{ backgroundImage: 'url(' + hero + ')' }" class="hero-image"></div>
    </div>
    <div class="hero-text text-center">
      <h1>{{ header }}</h1>
      <h2 class="text-weight-thin text-h4 q-mb-none line-height">{{ subHeading }}</h2>
      <h2 class="text-weight-thin text-h4 q-mt-none line-height">{{ subHeading2 }}</h2>
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
/* .z-top-100 {
  z-index: 1;
} */
.hero-wrapper {
  position: relative;
  overflow: hidden;
  height: 300px;
}
.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
}
@media (min-width: 500px) {
  .hero-text {
    min-width: 480px;
  }
}
.hero-image {
  height: 300px;
  background-size: contain;
  background-position: 20% 50%;
  background-repeat: no-repeat;
  filter: drop-shadow(2px 4px 6px #444) opacity(0.6);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: radial-gradient(at center, #fafafa 0%, #1c3c50 100%);
  opacity: 0.5;

  mix-blend-mode: multiply;
}
.line-height {
  line-height: 2rem;
}
</style>

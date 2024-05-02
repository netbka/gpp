<template>
  <div class="back_main">
    <div
      :style="{ backgroundImage: 'url(' + hero + ')' }"
      class="main-page-hero-image"
    ></div>

    <div class="row window-height-100 no-wrap justify-between items-center">
      <div class="col q-pa-md">
        <h1 class="text-black">Просто ОФП</h1>
        <h2 class="">Выбирай тренировку или создай свою</h2>

        <q-btn
          style="
            background: rgb(181, 209, 244) !important;
            border: 2px solid rgb(68 74 76 / 65%);
          "
          size="md"
          class="main-btn"
        >
          <NuxtLink class="no-style" to="/training/">GO к тренировкам</NuxtLink></q-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import hero from "/main_page_hero.webp";
</script>

<style scoped>
.main-page-hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 90%;
  opacity: 0.45;
  background-size: contain;
  background-position: 60% 50%;
  background-repeat: no-repeat;
  filter: drop-shadow(2px 4px 6px #444) opacity(0.6);
  mix-blend-mode: multiply;
}
.main-btn {
  color: #000;
}
</style>

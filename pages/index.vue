<template>
  <div class="back_main">
    <div class="row window-height-100 no-wrap justify-between items-center">
      <div class="col q-pa-md">
        <h1 class="text-black">Просто ОФП</h1>
        <h2 class="">Выбирай тренировку или создай свою</h2>

        <q-btn outline color="primary">
          <NuxtLink class="no-style" to="/training/">GO к тренировкам</NuxtLink></q-btn
        >
      </div>
      <div class="col-shrink gt-xs">
        <div class="q-mt-lg">
          <img :src="background" alt="" class="hero-sizing pic" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import background from "/sportivnyye-logotipy.png";
</script>

<style scoped>
.pic {
}
</style>

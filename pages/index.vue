<template>
  <div class="back_main">
    <div class="row window-height-100 no-wrap justify-between items-center">
      <div class="col q-pa-md">
        <h1 class="text-black">Просто ОФП</h1>
        <h2 class="">Создайте для себя идеальный план тренировок</h2>

        <q-btn outline color="primary" @click="redirect">К тренировкам </q-btn>
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
const redirect = async () => {
  await navigateTo({ path: "/workout" });
};
</script>

<style scoped>
.pic {
}
</style>

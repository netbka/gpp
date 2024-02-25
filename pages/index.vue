<template>
  <div class="back_main">
    <div class="row window-height-100 wrap justify-center items-center content-center">
      <div class="col-6 q-pa-md">
        <div class="text-black text-bold text-h3">Онлайн тренажер ОФП</div>
        <p class="text-h4">Подбор разных упражнений на все группы мышц</p>
        <p class="text-body1">
          Регистрируйтесь, чтобы сохранять свои программы и отслеживать прогресс
        </p>

        <q-btn outline color="primary" @click="redirect">К тренировкам </q-btn>
      </div>
      <div class="col-6">
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
  await navigateTo({ path: "/exercise" });
};
</script>

<style scoped>
.pic {
}
</style>

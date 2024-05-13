<template>
  <div class="back_main">
    <div
      :style="{ backgroundImage: 'url(' + hero + ')' }"
      class="main-page-hero-image"
    ></div>

    <div class="row window-height-100 no-wrap justify-between items-center">
      <div class="col q-pa-md z-top">
        <h2 class="text-black custom">Прокачай скорость и выносливость</h2>
        <h3 class="">Выбирай готовую тренировку или создай свою</h3>

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
useHead({
  titleTemplate:
    "Подбор тренировок для увеличения скорости бега и повышения выносливости | ОФП для бегунов",
  description:
    "Добавьте к своим тренировкам ОФП (общую физическую подготовку) - упражнения для бегунов. Все тренировки готовы для онлайн занятия.",
  ogTitle:
    "Подбор тренировок для увеличения скорости бега и повышения выносливости | ОФП для бегунов",
  ogDescription:
    "Добавьте к своим тренировкам ОФП (общую физическую подготовку) - упражнения для бегунов. Все тренировки готовы для онлайн занятия.",
});
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
.z-top {
  z-index: 99999;
}
.custom {
  font-size: 3rem;
}
</style>

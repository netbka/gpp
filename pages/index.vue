<template>
  <div
    class="back_main"
    :style="{ backgroundImage: 'url(' + website_main_page_background() + ')' }"
  >
    <div
      :style="{ backgroundImage: 'url(' + website_main_page_hero() + ')' }"
      class="main-page-hero-image"
    ></div>

    <div class="row window-height-100 no-wrap justify-between items-center">
      <div class="col q-pa-md z-top">
        <h2 class="text-black custom">{{ $t("index.heading") }}</h2>
        <h3 class="">{{ $t("index.subheading") }}</h3>

        <q-btn
          style="
            background: rgb(181, 209, 244) !important;
            border: 2px solid rgb(68 74 76 / 65%);
          "
          size="md"
          class="main-btn"
        >
          <NuxtLink class="no-style" to="/training/">{{
            $t("index.button")
          }}</NuxtLink></q-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  titleTemplate: "Занятия ОФП для начинающих и опытных атлетов | Просто ОФП",
  description:
    "Занятия ОФП для начинающих и опытных атлетов. Занимайтесь в онлайн формате с любого устройства. Выполняйте упражнения дома или на отдыхе.",
  ogTitle: "Занятия ОФП для начинающих и опытных атлетов | Просто ОФП ",
  ogDescription:
    "Занятия ОФП для начинающих и опытных атлетов. Занимайтесь в онлайн формате с любого устройства. Выполняйте упражнения дома или на отдыхе.",
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

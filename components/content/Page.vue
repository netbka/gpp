<template>
  <div>
    <div class="row content-heading q-px-sm">
      <div class="col-12">
        <h1 class="font-content">
          {{ data.name }}
        </h1>
      </div>

      <div class="col-12">
        <span class="text-subtitle2 text-weight-medium"><b>Мышцы: </b> </span>
        <q-chip
          size="12px"
          v-for="muscle in props.muscleArr"
          :key="muscle.id"
          outline
          color="secondary"
        >
          {{ muscle.name + " " }}
        </q-chip>
      </div>
      <div class="col-12">
        <span class="text-subtitle2 text-weight-medium"><b>Сложность: </b> </span>
        <q-rating
          v-model="data.level"
          size="1em"
          max="3"
          readonly
          class="q-mr-md"
          icon="fitness_center"
          :color-selected="['red-12', 'red-13', 'red-14']"
        />
      </div>
      <div class="col-12">
        <span class="text-caption"> Обновлено: </span>
        <q-chip outline square color="deep-grey" text-color="white" size="sm">
          {{ formatDate(data.updatedAt) }}
        </q-chip>
        <q-btn outline color="primary" size="xs" class="float-right">
          <NuxtLink class="no-style" :to="'/' + props.link.toLowerCase()"
            >Назад</NuxtLink
          ></q-btn
        >
      </div>
    </div>
    <div class="row q-px-sm">
      <div class="col-12 col-sm-6 q-pa-sm col-md-4 col-lg-3 self-top">
        <q-img
          class="img-exercise"
          :src="getImageFromStorage(props.link, data.id)"
          :error-src="errorImg"
          fit="scale-down"
          :alt="data.name"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-8 col-lg-9 q-pa-sm">
        <q-scroll-area class="scroll-content">
          <div v-html="data.description"></div>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import errorImg from "/build_transparent_300x300.webp";
const props = defineProps({
  data: { Type: Object, required: true },
  readOnly: { Type: Boolean, default: false },
  loading: { Type: Boolean, default: false },
  muscleArr: { Type: Array, default: [] },
  link: { Type: String, default: "" },
});

//const emits = defineEmits(["onUpdateField", "editItem"]);

const loading = toRef(() => props.loading);
</script>

<style scoped>
.exercise-card {
  width: 100%;
}
.img-exercise {
  min-height: 300px;
  object-fit: cover;
  max-width: 300px;
  min-width: 300px;
}
.content-heading {
  min-height: 150px;
}
.scroll-content {
  height: calc(100vh - 220px);
}
@media (min-width: 768px) {
  .scroll-content {
    height: calc(100vh - 270px);
  }
}

.font-content {
  font-size: calc(1.5em + 0.5vw) !important;
}
</style>

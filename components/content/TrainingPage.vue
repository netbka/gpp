<template>
  <div>
    <div class="row content-heading q-px-sm">
      <div class="col-12">
        <h1 class="font-content">
          {{ data.name }}
        </h1>
        <q-separator color="orange" inset />
      </div>

      <div class="col-12">
        <span class="text-subtitle2 text-weight-medium"><b>Продолжительность: </b> </span>
        <q-chip square size="12px" outline color="blue-grey-14" icon="timer">
          {{ durationToText(data.duration) }}
        </q-chip>
      </div>
      <div class="col-12">
        <span class="text-subtitle2 text-weight-medium"><b>Мышцы: </b> </span>
        <q-chip
          size="12px"
          v-for="muscle in props.muscleArr"
          :key="muscle.id"
          outline
          color="primary"
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
      <div class="col-12 q-mt-sm">
        <q-separator color="orange" inset />
      </div>
      <!-- <div class="col-6 float-right">
        <span class="text-caption"> Обновлено: </span>
        <q-chip outline square color="deep-grey" text-color="white" size="sm">
          {{ formatDate(data.updatedAt) }}
        </q-chip>
      </div> -->
    </div>
    <div class="row q-my-sm q-px-sm">
      <div class="col-12">
        <q-scroll-area class="scroll-content">
          <div v-html="description"></div>
          <q-btn color="primary" size="sm" class="float-left">
            <NuxtLink
              class="no-style"
              :to="'/' + props.link.toLowerCase() + '/workout/' + props.data.id"
              >Заниматься</NuxtLink
            ></q-btn
          >
          <q-btn color="secondary" size="sm" class="float-right">
            <NuxtLink class="no-style" :to="'/' + props.link.toLowerCase()"
              >Назад</NuxtLink
            ></q-btn
          >
        </q-scroll-area>
      </div>

      <!-- <div class="col-12">
        <q-btn outline color="primary" size="xs" class="float-right">
          <NuxtLink class="no-style" :to="'/' + props.link.toLowerCase()"
            >Назад</NuxtLink
          ></q-btn
        >
      </div> -->
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
const description = exerciseToTextNoName(props.data.exerciseGroup);
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

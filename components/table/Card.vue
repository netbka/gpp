<template>
  <q-card class="exercise-card q-mb-md" flat bordered>
    <q-card-section class="relative-position q-pa-none">
      <div class="row items-center justify-center img-exercise">
        <q-img
          fit="scale-down"
          :src="getExerciseImage(data.id + data.imageUrl)"
          :error-src="errorImg"
          style="max-width: 100%; height: 150px"
        >
        </q-img>
      </div>
      <div class="card-body q-px-sm">
        <div class="text-subtitle1 text-weight-bold text-white q-py-sm">
          {{ data.name }}
        </div>
        <div class="">
          <span class="text-subtitle2 text-weight-medium text-accent">Мышцы: </span>
          <span
            class="text-white text-caption"
            v-for="muscle in data.exerciseTemplateMuscle"
            :key="muscle.id"
          >
            {{ muscle.name + " " }}
          </span>
        </div>
        <div class="">
          <span class="text-subtitle2 text-weight-medium text-accent">Сложность: </span>
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
      </div>
    </q-card-section>

    <q-card-actions class="card-actions" align="right">
      <q-btn
        v-show="!props.readOnly"
        flat
        color="light-green-9"
        size="sm"
        icon="edit"
        @click="$emit('onEditItem', data.id)"
        class="q-px-xs q-mx-xs"
      >
      </q-btn>
      <q-btn
        v-show="!props.readOnly"
        flat
        color="red-7"
        size="sm"
        icon="close"
        @click="$emit('onDeleteItem', data.id)"
        class="q-px-xs q-mx-xs"
      >
      </q-btn>
      <q-btn outline color="secondary" size="sm">
        <NuxtLink class="no-style" :to="link(data)">подробнее</NuxtLink></q-btn
      >
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { Slug } from "~/types/ISlug";
import errorImg from "/exerciseSmall.png";
const props = defineProps({
  data: { Type: Object, default: {} },
  //cols: { Type: Object, default: {} },
  readOnly: { Type: Boolean, default: true },
});
const emits = defineEmits(["onUpdateField", "onEditItem", "onDeleteItem"]);
const link = (data) => {
  return new Slug(data, "exercisetemplate").getSlug();
};
</script>

<style scoped>
.exercise-card {
  height: 300px;
  max-height: 310px;
  width: 100%;
  padding: 0 !important;
}
.q-img__image--loaded {
  filter: opacity(0.7);
}
.no-filter {
  filter: none !important;
}
.img-exercise {
  object-fit: contain;
  max-height: 150px;
  height: 150px;
}

.q-img__content > div {
  pointer-events: all;
  position: absolute;
  padding: 8px;
  color: #fff;
  background: rgb(73 139 182 / 88%);
}

.card-body {
  height: 105px;

  position: relative;
  background-color: #02263c;
}
.card-actions {
  background-color: #1c3c50;
}
</style>

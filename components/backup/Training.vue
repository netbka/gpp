<template>
  <div class="row q-mb-xs q-mr-sm">
    <div class="col-12">
      <div class="text-subtitle1 text-bold">План тренировки</div>
      <q-item-label caption
        >Продолжительность: {{ numToMin(duration) }} мин.
        {{ numToSec(duration) }} сек.</q-item-label
      >
    </div>
  </div>
  <q-separator />
  <div class="row q-mt-sm">
    <div class="col-12"></div>
  </div>

  <WorkoutBtnDuration></WorkoutBtnDuration>

  <div class="row q-mt-sm">
    <div class="col-12">
      <div class="q-mt-xs">
        <BaseNested :data="store.defaultItem"></BaseNested>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import exerciseSmall from "/exerciseSmall.png";
import { useWorkoutStore } from "~/stores/workout";
const store = useWorkoutStore();
const duration = computed(() => store.calculateDuration());
</script>

<style></style>

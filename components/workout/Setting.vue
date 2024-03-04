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
        <WorkoutNested :data="store.defaultItem"></WorkoutNested>
      </div>
    </div>
  </div>
  <!--
  <q-card flat bordered class="q-mt-md q-mr-xs">
     <q-item>
      <q-item-section avatar>
        <q-avatar size="60px">
          <img :src="exerciseSmall" class="cursor-pointer" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <div class="row">
          <div class="col-6 self-center">
            <q-item-label>Настройки занятия</q-item-label>
            <q-item-label caption
              >Продолжительность: {{ numToMin(duration) }} мин.
              {{ numToSec(duration) }} сек.</q-item-label
            >
          </div>
        </div>
      </q-item-section>
    </q-item>

    <q-separator /> 

    <q-card-section horizontal>
      <q-card-section class="col-7"> </q-card-section>

      <q-card-section class="col-5">
        <div class="text-subtitle1 text-center text-bold">Настройки</div>
        <q-separator />
        <q-item-label caption class="text-center"> Уровень</q-item-label>
        <div class="text-subtitle1 text-center text-bold">Уровень</div> 
      </q-card-section>
    </q-card-section>
    <q-separator />

    <q-card-actions> </q-card-actions>
  </q-card>-->
</template>

<script lang="ts" setup>
import exerciseSmall from "/exerciseSmall.png";
import { useWorkoutStore } from "~/stores/workout";
const store = useWorkoutStore();
const duration = computed(() => store.calculateDuration());

// const emits = defineEmits(["start", "restart"]);
// let start = ref(false);
// let error = ref(false);

// defineExpose({
//   stopTimer,
// });
</script>

<style></style>

<template>
  <q-card flat bordered class="q-mt-md q-mr-xs">
    <!-- <q-item>
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

    <q-separator /> -->

    <q-card-section horizontal>
      <q-card-section class="col-7">
        <div class="text-subtitle1 text-bold">План тренировки</div>
        <q-item-label caption
          >Продолжительность: {{ numToMin(duration) }} мин.
          {{ numToSec(duration) }} сек.</q-item-label
        >
        <div class="q-mt-xs">
          <ExerciseNested :data="store.defaultItem"></ExerciseNested>
        </div>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-5">
        <div class="text-subtitle1 text-center text-bold">Настройки</div>
        <q-separator />
        <q-item-label caption class="text-center"> Уровень</q-item-label>
        <!-- <div class="text-subtitle1 text-center text-bold">Уровень</div> -->

        <div class="row q-col-gutter-sm">
          <div class="col-4">
            <q-btn
              outline
              color="primary"
              class="full-width"
              label="45 сек."
              @click="setDuration(45)"
              size="sm"
            />
          </div>
          <div class="col-4">
            <q-btn
              outline
              color="primary"
              class="full-width"
              label="60 сек."
              @click="setDuration(60)"
              size="sm"
            />
          </div>
          <div class="col-4">
            <q-btn
              outline
              color="primary"
              class="full-width"
              label="90 сек."
              @click="setDuration(90)"
              size="sm"
            />
          </div>
        </div>
      </q-card-section>
    </q-card-section>
    <q-separator />

    <q-card-actions> </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import exerciseSmall from "/exerciseSmall.png";
import { useWorkoutStore } from "~/stores/workout";
const store = useWorkoutStore();
const duration = computed(() => store.calculateDuration());
const setDuration = (val) => {
  store.setDuration(val);
};
// const emits = defineEmits(["start", "restart"]);
// let start = ref(false);
// let error = ref(false);

// defineExpose({
//   stopTimer,
// });
</script>

<style></style>

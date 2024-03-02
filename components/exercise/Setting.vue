<template>
  <q-card flat bordered class="q-mt-md">
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
      <q-card-section class="col-7">
        <div class="text-subtitle1">План тренировки</div>
        <div>
          <ExerciseNested :data="store.defaultItem"></ExerciseNested>
        </div>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-5">
        <div class="text-subtitle1 text-center text-bold">Настройки</div>
        <q-separator />
        <div class="text-subtitle1 text-center text-bold">Разминка</div>
      </q-card-section>
    </q-card-section>
    <q-separator />

    <q-card-actions>
      <q-btn
        @click="startTimer"
        :icon="!start ? startBtn.iconStart : startBtn.iconPause"
        :label="!start ? startBtn.textStart : startBtn.textPause"
        outline
        color="primary"
        :disabled="error"
      />
      <q-btn
        @click="$emit('restart')"
        :icon="startBtn.iconRestart"
        :label="startBtn.textRestart"
        outline
        color="primary"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import exerciseSmall from "/exerciseSmall.png";
import { useExcerciseStore } from "~/stores/exercise";

const store = useExcerciseStore();
const duration = computed(() => store.calculateDuration());

const emits = defineEmits(["start", "restart"]);
let start = ref(false);
let error = ref(false);
const startTimer = () => {
  start.value = !start.value;
  emits("start", start.value);
};

let startBtn = reactive({
  textStart: "Погнали",
  iconStart: "play_arrow",

  textRestart: "Перезапустить",
  iconRestart: "restart_alt",

  textPause: "Пауза",
  iconPause: "pause",
});

let stopTimer = () => {
  start.value = false;
  emits("start", false);
};

defineExpose({
  stopTimer,
});
</script>

<style></style>

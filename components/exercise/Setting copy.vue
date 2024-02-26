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
          <div class="col-6">
            <q-item-label>Настройки занятия</q-item-label>
            <q-item-label caption>Продолжительность </q-item-label>
          </div>
        </div>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section class="col-7">
        <div class="text-subtitle1">Упражнения</div>
      </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-5">
        <div class="text-subtitle1 text-center text-bold">Настройки</div>
        <q-separator />
        <div class="text-subtitle1 text-center text-bold">Разминка</div>

        <div class="row q-col-gutter-xs text-center">
          <div class="col-4">Упражнение</div>
          <div class="col-4">Количество</div>
          <div class="col-4">Отдых</div>
        </div>
        <div class="row q-col-gutter-xs text-center">
          <div class="col-4">
            <q-input
              bg-color="white"
              dense
              outlined
              v-model="settings.mainDurationMin"
              label="Секунды"
              :disable="start"
              type="number"
              max="180"
              min="0"
              class="text-center"
              input-style="text-align: center"
            />
          </div>
          <div class="col-4">Кол-ство</div>
          <div class="col-4">Отдых</div>
        </div>

        <div class="text-subtitle2 text-center q-mb-sm">Продолжительность упражнения</div>

        <div class="row justify-evenly">
          <div class="col-3">
            <q-input
              bg-color="white"
              dense
              outlined
              v-model="settings.mainDurationMin"
              label="Минуты"
              :disable="start"
              type="number"
              max="59"
              min="0"
              class="text-center"
              input-style="text-align: center"
            />
          </div>
          <div class="col-3">
            <q-input
              bg-color="white"
              dense
              outlined
              v-model="settings.mainDurationSec"
              label="Секунды"
              :disable="start"
              type="number"
              max="60"
              min="0"
              input-style="text-align: center"
              step="15"
            />
          </div>
        </div>
        <div class="text-subtitle2 text-center q-my-sm">Продолжительность перерыва</div>

        <div class="row justify-evenly">
          <div class="col-3">
            <q-input
              bg-color="white"
              dense
              outlined
              v-model="settings.mainRestDurationMin"
              label="Минуты"
              :disable="start"
              type="number"
              max="59"
              min="0"
              class="text-center"
              input-style="text-align: center"
            />
          </div>
          <div class="col-3">
            <q-input
              bg-color="white"
              dense
              outlined
              v-model="settings.mainRestDurationSec"
              label="Секунды"
              :disable="start"
              type="number"
              max="60"
              min="0"
              input-style="text-align: center"
              step="15"
            />
          </div>
        </div>
        <div class="row text-center">
          <div class="col-4">Упражнение</div>
          <div class="col-4">Отдых</div>
          <div class="col-4">Повторы</div>
        </div>
        <div class="row text-center q-col-gutter-xs">
          <div class="col-4">
            <q-input
              bg-color="white"
              dense
              outlined
              v-model="settings.mainDurationExercise"
              label="Секунды"
              :disable="start"
              type="number"
              max="60"
              min="0"
              input-style="text-align: center"
              step="15"
            />
          </div>
          <div class="col-4">
            <q-input
              bg-color="white"
              dense
              outlined
              v-model="settings.mainDurationRest"
              label="Секунды"
              :disable="start"
              type="number"
              max="60"
              min="0"
              input-style="text-align: center"
              step="15"
            />
          </div>
          <div class="col-4">
            <q-input
              bg-color="white"
              dense
              outlined
              v-model="settings.mainCount"
              label="количество"
              :disable="start"
              type="number"
              max="60"
              min="0"
              input-style="text-align: center"
              step="15"
            />
          </div>
        </div>
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
const emits = defineEmits(["start", "restart"]);
let start = ref(false);
let error = ref(false);
const startTimer = () => {
  start.value = !start.value;
  emits("start", start.value);
};
const settings = reactive({
  wuDuration: 60,
  wuDurationRest: 30,
  wuCount: 2,

  // wuDurationSec: 0,
  // wuDurationMin: 2,

  // mainDurationSec: 0,
  // mainDurationMin: 1,
  // mainRestDurationSec: 30,
  // mainRestDurationMin: 0,

  mainDurationExercise: 60,
  mainDurationRest: 30,
  mainCount: 8,
  mainRepeat: 8,

  cdDuration: 60,
  cdDurationRest: 30,
  cdCount: 2,

  // cdDurationSec: 0,
  // cdDurationMin: 2,
  // cdCount: 2,
});
// const restartTimer = () => {

//   emits("restart", start.value);
// };

let startBtn = reactive({
  textStart: "Погнали",
  iconStart: "play_arrow",

  textRestart: "Перезапустить",
  iconRestart: "restart_alt",

  textPause: "Пауза",
  iconPause: "pause",
});
</script>

<style></style>

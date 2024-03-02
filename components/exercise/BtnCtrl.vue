<template>
  <div class="row justify-center q-col-gutter-lg q-mt-md">
    <div class="col-6">
      <q-btn
        @click="startTimer"
        :icon="!store.isStarted ? startBtn.iconStart : startBtn.iconPause"
        :label="!store.isStarted ? startBtn.textStart : startBtn.textPause"
        outline
        color="primary"
        :disabled="error"
        class="width75"
      />
    </div>

    <div class="col-6">
      <q-btn
        @click="$emit('restart')"
        :icon="startBtn.iconRestart"
        :label="startBtn.textRestart"
        outline
        color="primary"
        class="width75"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useExcerciseStore } from "~/stores/exercise";
const store = useExcerciseStore();

let startBtn = reactive({
  textStart: "Погнали",
  iconStart: "play_arrow",

  textRestart: "Перезапустить",
  iconRestart: "restart_alt",

  textPause: "Пауза",
  iconPause: "pause",
});
const emits = defineEmits(["restart"]);
let error = ref(false);
const startTimer = () => {
  store.isStarted = !store.isStarted;
  //start.value = !start.value;
  //emits("start", start.value);
};

let stopTimer = () => {
  store.isStarted = false;
  //start.value = false;
  //emits("start", false);
};
</script>

<style scoped>
.width75 {
  min-width: 80%;
}
</style>

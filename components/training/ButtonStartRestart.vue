<template>
  <div>
    <!-- <div class="row items-start q-mt-sm q-ml-sm justify-between fixed-top">
    <div class="col-grow"> -->
    <q-btn
      @click="startTimer"
      :icon="!store.isStarted ? startBtn.iconStart : startBtn.iconPause"
      outline
      color="black"
      :disabled="error"
      class="q-mr-md"
      v-show="!endOfTraining"
    >
      <span class="gt-xs">
        {{ !store.isStarted ? startBtn.textStart : startBtn.textPause }}</span
      >
    </q-btn>
    <q-btn
      @click="$emit('restart')"
      :icon="startBtn.iconRestart"
      outline
      color="black"
      class="q-mr-md"
    >
      <span class="gt-xs"> {{ startBtn.textRestart }}</span>
    </q-btn>
    <q-btn
      @click="$emit('backwardExercise')"
      :icon="startBtn.iconBackward"
      outline
      color="black"
      class="q-mr-md"
      v-show="!endOfTraining"
      :disabled="backwardDisabled"
    >
      <span class="gt-xs"> {{ startBtn.textBackward }}</span>
    </q-btn>
    <q-btn
      @click="$emit('forwardExercise')"
      :icon="startBtn.iconForward"
      outline
      color="black"
      v-show="!endOfTraining"
      :disabled="forwardDisabled"
    >
      <span class="gt-xs"> {{ startBtn.textForward }}</span>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  endOfTraining: { Type: Boolean, default: false },
  forwardDisabled: { Type: Boolean, default: false },
  backwardDisabled: { Type: Boolean, default: false },
});
const store = useTrainingStore();

let startBtn = reactive({
  textStart: "Погнали",
  iconStart: "play_arrow",

  textRestart: "Заново",
  iconRestart: "restart_alt",

  textForward: "След. упражнение",
  iconForward: "last_page",

  textBackward: "Пред. упражнение",
  iconBackward: "first_page",

  textPause: "Пауза",
  iconPause: "pause",
});
const emits = defineEmits(["restart", "forwardExercise", "backwardExercise"]);
let error = ref(false);
const startTimer = () => {
  store.isStarted = !store.isStarted;
};

let stopTimer = () => {
  store.isStarted = false;
};
</script>

<style scoped>
.width75 {
  min-width: 80%;
}
</style>

<template>
  <div class="fit row justify-center items-start content-start q-gutter-xs">
    <q-btn
      @click="startTimer"
      :icon="!store.isStarted ? startBtn.iconStart : startBtn.iconPause"
      outline
      color="black"
      :disabled="error"
      class=""
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
      class=""
    >
      <!-- <span class="gt-xs"> {{ startBtn.textRestart }}</span> -->
    </q-btn>
    <q-btn
      @click="$emit('backwardExercise')"
      :icon="startBtn.iconBackward"
      outline
      color="black"
      class=""
      v-show="!endOfTraining"
      :disabled="backwardDisabled"
    >
      <!-- <span class="gt-xs"> {{ startBtn.textBackward }}</span> -->
    </q-btn>
    <q-btn
      @click="$emit('forwardExercise')"
      :icon="startBtn.iconForward"
      outline
      color="black"
      v-show="!endOfTraining"
      :disabled="forwardDisabled"
    >
      <!-- <span class="gt-xs"> {{ startBtn.textForward }}</span> -->
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
  textStart: "GO",
  iconStart: "play_arrow",

  //textRestart: "Заново",
  iconRestart: "restart_alt",

  //textForward: "След. упражнение",
  iconForward: "last_page",

  //textBackward: "Пред. упражнение",
  iconBackward: "first_page",

  //textPause: "Пауза",
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

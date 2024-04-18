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
    >
      <span class="gt-xs">
        {{ !store.isStarted ? startBtn.textStart : startBtn.textPause }}</span
      >
    </q-btn>
    <q-btn @click="$emit('restart')" :icon="startBtn.iconRestart" outline color="black">
      <span class="gt-xs"> {{ startBtn.textRestart }}</span>
    </q-btn>
    <!-- </div> -->

    <!-- <div class="col-auto"> -->

    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
const store = useTrainingStore();

let startBtn = reactive({
  textStart: "Погнали",
  iconStart: "play_arrow",

  textRestart: "Заново",
  iconRestart: "restart_alt",

  textPause: "Пауза",
  iconPause: "pause",
});
const emits = defineEmits(["restart"]);
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

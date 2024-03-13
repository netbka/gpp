<template>
  <q-dialog
    persistent
    :full-height="propFullHeight"
    v-on:keyup.esc="hide()"
    ref="dialog"
    class="no-padding row"
  >
    <div class="text-center q-ml-sm">
      <q-knob
        show-value
        font-size="40px"
        class="q-ma-md"
        v-model="timer"
        size="250px"
        :thickness="0.05"
        color="primary"
        track-color="grey-2"
        readonly
      >
        <span class="text-light-blue-2">
          {{ numToMinText(counterDuration) }}:{{ numToSecText(counterDuration) }}
        </span>
      </q-knob>

      <div class="text-light-blue-7 text-h3 text-uppercase">
        {{ store.activeGroup.name }}
      </div>
      <div class="text-light-blue-2 text-h5">{{ showExerciseName() }}</div>
      <div v-if="exerciseImage">
        <img :src="exerciseImage" class="img-fluid" />
      </div>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
const store = useTrainingStore();

const emits = defineEmits(["stopTimer"]);
const props = defineProps({
  isStarted: {
    type: Boolean,
    default: false,
  },
  propFullHeight: { type: Boolean, default: false },
});
const dialog = ref(null);
let counterDuration: number = ref(0);

const initDuration = computed(() => store.getActiveExerciseDuration());
const grpIndex: number = ref(0);
const exrIndex: number = ref(0);
let timer = ref(100);
let intervalId: number;
import { useQuasar } from "quasar";

const $q = useQuasar();

onMounted(() => {
  // store.resetCurrentItem();
  grpIndex.value = store.getInitialActiveGroup();
});
let resetCounter = () => {
  timer.value = 100;
  grpIndex.value = 0;
  exrIndex.value = 0;
  //counterDuration.value = 0;
};
const hide = () => {
  resetTraining();
};
// const showTimeLeft = () => {
//   let result = "";
//   if (numToMin(counterDuration.value) > 0)
//     result = numToMin(counterDuration.value) + " мин";
//   result = result + " " + numToSec(counterDuration.value) + " сек";
//   return result;
// };
const exerciseImage = computed(() => {
  try {
    return store.activeGroup.exercise[exrIndex.value].imageUrl.length > 0 &&
      store.activeGroup.exercise[exrIndex.value].templateId !== null
      ? getExerciseImage(store.activeGroup.exercise[exrIndex.value].templateId + ".gif")
      : null;
  } catch (error) {}
});

const resetTraining = () => {
  store.resetActive();
  resetCounter();
  emits("stopTimer");
  store.isStarted = false;
  store.getInitialActiveGroup();
  dialog.value.hide();
};

defineExpose({
  resetTraining,
});

const showExerciseName = () => {
  const index = store.getActiveExerciseIndex();
  try {
    return index > 0
      ? store.activeGroup.exercise[index].name
      : store.activeGroup.exercise[0].name;
  } catch (error) {}
};

const audio = new Audio("/sound/10sec.mp3");
const startTimer = () => {
  if (calculateDuration(store.currentItem.exerciseGroup) === 0) return; // no exercises available
  if (grpIndex.value + 1 > store.defaultItem.length && this.activeGroup.repeats === 0) {
    resetTraining();

    return;
  } //got to end of training

  if (counterDuration.value === 0) {
    if (exrIndex.value + 1 > store.activeGroup.exercise.length) {
      //got to last exercise in group

      store.activeGroup.repeats--;
      if (store.activeGroup.repeats > 0) {
        //need to repeat this group
        exrIndex.value = 0;
        //startTimer();
      }
      if (store.activeGroup.repeats === 0) {
        grpIndex.value = store.getGroupByIndex(grpIndex.value + 1); //go to next group
        if (grpIndex.value < 0) {
          resetTraining();
          return;
        }
        store.resetActive();
        exrIndex.value = 0;
      }
    }
    store.setActiveGroup(true);
    store.setActiveExercise(exrIndex.value, true);
    counterDuration.value = store.getActiveExerciseDuration();
    dialog.value.show();
  } //counter duration ===0

  intervalId = setInterval(() => {
    if (counterDuration.value === 10) {
      audio.play();
    }
    if (counterDuration.value === 0) {
      audio.play();
      clearInterval(intervalId);
      store.setActiveExercise(exrIndex.value, false);
      exrIndex.value++;
      startTimer();
    } else {
      counterDuration.value--;
      timer.value = (counterDuration.value / initDuration.value) * 100;
    }
  }, 1000);
};

const isStarted = computed(() => {
  return store.isStarted;
});
const stopTimer = function () {
  clearInterval(intervalId);
};
//let exerciseIntervalId: number;

watch(
  () => store.getActiveExerciseDuration(),
  (newVal) => {
    //console.log(newVal);
    counterDuration.value = newVal;
    //initDuration.value = newVal;
  },
  { deep: true }
);

watch(
  () => store.currentItem,
  (newVal) => {
    if (!isStarted) grpIndex.value = store.getInitialActiveGroup();
  },
  { deep: true }
);

watch(isStarted, () => {
  if (isStarted.value) {
    startTimer();
    //startExcersice();
  } else {
    stopTimer();
  }
});
</script>

<style>
.img-fluid {
  height: calc(100vh / 3);
}
</style>

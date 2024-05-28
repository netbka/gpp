<template>
  <div>
    <TrainingCounterCountdown ref="initCounter"></TrainingCounterCountdown>
    <TrainingDialogcardMain ref="dialog" :counterDuration="counterDuration">
      <template #actions>
        <TrainingDialogcardButtonStartRestart
          @hide="hide"
          @restart="restart"
          @forwardExercise="forwardExercise"
          @backwardExercise="backExercise"
          :endOfTraining="showResult"
          :backwardDisabled="backwardDisabled"
        ></TrainingDialogcardButtonStartRestart>
      </template>
    </TrainingDialogcardMain>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(["stopTimer"]);
// const props = defineProps({
//   isStarted: {
//     type: Boolean,
//     default: false,
//   },
//   propFullHeight: { type: Boolean, default: false },
// });

const initCounter = ref(null);
const dialog = ref(null);
const store = useTrainingStore();

let intervalId: number;

const { pauseAudio, stopAudio, startAudio, startAudioConditional } = useAudio(
  "/sound/exerciseFinish.mp3"
);
const {
  //showExerciseName,
  isLastExerciseInGroup,
  isLastGroup,
  isBeginningOfTraining,
  isEndOfTraining,
  exrIndex,
  grpIndex,
  counterDuration,
  showResult,
  //timer,
  //initDuration,
  restartTraining,
  endOfTraining,
  updateCounterTimer,
  backwardExercise,
  backwardDisabled,
} = useTrainingExercise();

onMounted(() => {
  restart();
});

const hide = () => {
  store.isStarted = false;
  dialog.value.hide();
};

const forwardExercise = () => {
  counterDuration.value = 1;
};

const backExercise = () => {
  stopAudio();
  backwardExercise();
};

const restart = () => {
  stopAudio();
  restartTraining();
};

const { isLoggedIn } = useAuthUser();
const storeTrainingTrack = trainingTrackStore();
const crudTT = useClientCrud(storeTrainingTrack);
const saveTrainingTrack = async () => {
  if (!isLoggedIn()) return;
  storeTrainingTrack.currentItem.trainingId = store.currentItem.id;
  storeTrainingTrack.currentItem.duration = store.getDuration;

  await crudTT.createItem();
};

const startTimer = async () => {
  if (calculateDuration(store.currentItem.exerciseGroup) === 0) return; // no exercises available
  if (isBeginningOfTraining() === true) await initCounter.value.start(); //show 5 to 1 counter

  if (counterDuration.value === 0) {
    if (isLastExerciseInGroup() === true) {
      store.activeGroup.repeats--;
      exrIndex.value = 0;
      store.resetActive();
      if (store.activeGroup.repeats === 0)
        grpIndex.value = store.getNextGroupByIndex(grpIndex.value + 1); //go to next group

      if (isEndOfTraining() === true) return;
      //got to end of training
    }
    store.setActiveGroup(true);
    store.setActiveExercise(exrIndex.value, true);
    counterDuration.value = store.getActiveExerciseDuration();
  } //counter duration ===0

  intervalId = setInterval(() => {
    startAudioConditional(counterDuration.value);

    if (counterDuration.value === 0) {
      stopAudio();
      store.setActiveExercise(exrIndex.value, false);
      exrIndex.value++;
      clearInterval(intervalId);
      startTimer();
    } else {
      updateCounterTimer();
    }
  }, 1000);
};

const stopTimer = function () {
  pauseAudio(counterDuration.value);
  clearInterval(intervalId);
};

watch(
  () => showResult,
  (newVal) => {
    if (newVal.value === true) {
      saveTrainingTrack();
    }
  },
  { deep: true }
);

watch(
  () => store.getIsStarted,
  (newVal) => {
    if (newVal) {
      requestWakeLock(newVal);
      startTimer();
    } else {
      requestWakeLock(newVal);
      stopTimer();
    }
  },
  { deep: true }
);

const show = () => {
  dialog.value.show();
};
defineExpose({
  show,
  endOfTraining,
  saveTrainingTrack,
});
</script>

<style scoped>
/* .exercise-image {
  height: calc(100vh / 3);
  object-fit: scale-down;
  max-width: 1200px;
  width: -webkit-fill-available;
} 
.padding {
  padding-left: calc((100vw - 1439px) / 2);
  padding-right: calc((100vw - 1439px) / 2);
}
.counter-card {
  max-width: 100vw !important;
  width: calc(100vw - 30px) !important;
}

@media (min-width: 760px) {
  .counter-card {
    min-width: 720x !important;
    max-width: 1200px !important;
    width: calc(100vw - 30px);
  }
}

.counter-dialog {
  width: 700px !important;
}

.position_knob {
  position: relative;
  left: 100px;
}*/
</style>

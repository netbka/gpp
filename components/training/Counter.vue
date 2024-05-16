<template>
  <div>
    <TrainingCounterCountdown ref="initCounter"></TrainingCounterCountdown>
    <q-dialog
      persistent
      full-height
      v-on:keyup.esc="hide()"
      ref="dialog"
      class="no-padding counter-dialog"
    >
      <q-card class="bg-white text-white counter-card">
        <q-toolbar>
          <q-toolbar-title>
            <TrainingButtonStartRestart
              @hide="hide"
              @restart="restart"
              @forwardExercise="forwardExercise"
              @backwardExercise="backExercise"
              :endOfTraining="showResult"
            ></TrainingButtonStartRestart>
          </q-toolbar-title>
          <q-btn dense flat icon="close" @click="hide" color="grey" class="" />
        </q-toolbar>

        <q-card-section v-show="!showResult">
          <div class="text-center">
            <q-knob
              show-value
              font-size="40px"
              class="q-ma-md"
              v-model="timer"
              size="200px"
              :thickness="0.05"
              color="primary"
              track-color="grey-2"
              readonly
            >
              <span class="text-light-blue-2">
                {{ numToMinText(counterDuration) }}:{{ numToSecText(counterDuration) }}
              </span>
            </q-knob>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="!showResult">
          <div class="text-light-blue-7 text-h4 text-uppercase text-center">
            {{ store.activeGroup.name }}
          </div>
          <div class="text-light-blue-10 text-h4 text-center">
            {{ showExerciseName() }}
          </div>
          <div class="">
            <q-img
              :src="exerciseImage"
              :error-src="errorImg"
              fit="scale-down"
              class="exercise-image"
            />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-show="showResult">
          <div class="text-light-blue-7 text-h4 text-uppercase text-center">
            Тренировка завершена
          </div>
          <div class="text-light-blue-10 text-h4 text-center">Ты молодец!</div>
          <div class="row justify-center">
            <div class="col-auto">
              <div class="text-blue-10" v-html="store.currentItem.description"></div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import errorImg from "/build_transparent_150.png";
const emits = defineEmits(["stopTimer"]);
const props = defineProps({
  // isStarted: {
  //   type: Boolean,
  //   default: false,
  // },
  //propFullHeight: { type: Boolean, default: false },
});

const initCounter = ref(null);
const dialog = ref(null);
const store = useTrainingStore();

let intervalId: number;

const { pauseAudio, stopAudio, startAudio, startAudioConditional } = useAudio(
  "/sound/10sec.mp3"
);
const {
  showExerciseName,
  isLastExerciseInGroup,
  isLastGroup,
  isBeginningOfTraining,
  isEndOfTraining,
  exrIndex,
  grpIndex,
  counterDuration,
  showResult,
  timer,
  initDuration,
  restartTraining,
  endOfTraining,
  updateCounterTimer,
  backwardExercise,
} = useTrainingExercise();

onMounted(() => {
  restart();
});

const hide = () => {
  store.isStarted = false;
  dialog.value.hide();
};

const { getImageUrl } = useImageManager();
const exerciseImage = computed(() => {
  try {
    let fileName = store.activeGroup.exercise[exrIndex.value].templateId;

    return store.activeGroup.exercise[exrIndex.value].templateId !== null
      ? getImageUrl(fileName, "exerciseTemplate")
      : null;
  } catch (error) {
    return null;
  }
});

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
      startTimer();
    } else {
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
.exercise-image {
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
</style>

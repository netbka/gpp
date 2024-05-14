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
  isStarted: {
    type: Boolean,
    default: false,
  },
  //propFullHeight: { type: Boolean, default: false },
});

// const currentExercisePosition = useState(
//   () => store.activeGroup.exercise[exrIndex.value]
// );
//const currentExercisePosition = reactive(store.activeGroup.exercise[exrIndex.value]);
// const savedTrainingPosition = reactive({
//   grpIndex: 0,
//   exrIndex: 0,
// });
const showResult = ref(true);
const initCounter = ref(null);
const dialog = ref(null);
const store = useTrainingStore();

let counterDuration: number = ref(0);

const initDuration = computed(() => store.getActiveExerciseDuration());
const grpIndex: number = ref(0);
const exrIndex: number = ref(0);
let timer = ref(100);
let intervalId: number;
const audio = new Audio("/sound/10sec.mp3");

onMounted(() => {
  //grpIndex.value = store.getInitialActiveGroup();

  restart();
});
let resetCounter = () => {
  timer.value = 100;
  grpIndex.value = 0;
  exrIndex.value = 0;
};
const hide = () => {
  // savedTrainingPosition.grpIndex = grpIndex.value;
  // savedTrainingPosition.exrIndex = exrIndex.value;

  //endOfTraining();
  if (audio.currentTime > 0) stopAudio();
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

const backwardExercise = () => {};

const stopAudio = () => {
  audio.pause();
  audio.currentTime = 0;
};

const restart = () => {
  showResult.value = !showResult.value;
  if (audio.currentTime > 0) stopAudio();

  store.resetActive();
  resetCounter();
  store.isStarted = false;
  store.getInitialActiveGroup();
};

const endOfTraining = () => {
  showResult.value = true;
  //if (audio.currentTime > 0) stopAudio();
  //store.resetActive();
  //resetCounter();
  //store.isStarted = false;
  //store.getInitialActiveGroup();
  //dialog.value.hide();
};
const { isLoggedIn } = useAuthUser();
const storeTrainingTrack = trainingTrackStore();
const crudTT = useClientCrud(storeTrainingTrack);
const saveTrainingTrack = async () => {
  if (!isLoggedIn()) return;
  storeTrainingTrack.currentItem.trainingId = store.currentItem.id;
  storeTrainingTrack.currentItem.duration = store.getDuration;
  //await storeTrainingTrack.createCurrentItem();
  await crudTT.createItem();
};

const showExerciseName = () => {
  const index = store.getActiveExerciseIndex();
  try {
    return index > 0
      ? store.activeGroup.exercise[index].name
      : store.activeGroup.exercise[0].name;
  } catch (error) {}
};

// const startInitCounter = async () => {
//   await initCounter.value.start();
// };

const startTimer = async () => {
  if (
    grpIndex.value === 0 &&
    exrIndex.value === 0 &&
    counterDuration.value === initDuration.value
  ) {
    await initCounter.value.start();
  }
  if (calculateDuration(store.currentItem.exerciseGroup) === 0) return; // no exercises available
  if (
    grpIndex.value + 1 > store.currentItem.exerciseGroup.length &&
    this.activeGroup.repeats === 0
  ) {
    saveTrainingTrack();
    endOfTraining();

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
          saveTrainingTrack();
          endOfTraining();
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
    if (counterDuration.value < 11) {
      audio.play();
    }
    if (counterDuration.value === 0) {
      if (audio.currentTime > 0) stopAudio(); //stop audio
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
  if (counterDuration.value < 10) {
    audio.currentTime = 10 - counterDuration.value;
    audio.pause();
  }
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
  () => store.getCurrentItem,
  (newVal) => {
    if (!isStarted.value) grpIndex.value = store.getInitialActiveGroup();
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

const show = () => {
  dialog.value.show();
};
defineExpose({
  show,
  endOfTraining,
  saveTrainingTrack,
});
</script>

<style>
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

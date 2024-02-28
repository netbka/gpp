<template>
  <div class="text-center">
    <q-knob
      show-value
      font-size="48px"
      class="q-ma-md"
      v-model="timer"
      size="400px"
      :thickness="0.05"
      color="primary"
      track-color="grey-2"
      readonly
    >
      {{ numToMin(counterDuration) }}мин. {{ numToSec(counterDuration) }}сек.
    </q-knob>
    <br />
    {{ activeGroup }}
    <br />
    {{ activeExercise }}
  </div>
</template>

<script lang="ts" setup>
import { useExcerciseStore } from "~/stores/exercise";
const store = useExcerciseStore();

const props = defineProps({
  isStarted: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 60,
  },
});

const { duration } = props;
// const counterDuration = ref(duration);
// const initDuration = ref(duration);
let counterDuration: number = ref(0);
let initDuration: number = ref(0);

let resetCounter = () => {
  counterDuration.value = initDuration.value;
  timer.value = 100;
};
onMounted(() => {
  store.resetCurrentItem();
});
defineExpose({
  resetCounter,
});
let timer = ref(100);
let intervalId: number;

const startTimer = () => {
  intervalId = setInterval(() => {
    if (counterDuration.value === 0) {
      clearInterval(intervalId);
    } else {
      counterDuration.value--;
      timer.value = (counterDuration.value / initDuration.value) * 100;
    }
  }, 1000);
};

const isStarted = computed(() => {
  return props.isStarted;
});
const stopTimer = function () {
  clearInterval(intervalId);
  //clearInterval(exerciseIntervalId);
};
//let exerciseIntervalId: number;
let activeGroup = ref({});
let activeExercise = ref({});
let shouldExit = false;
const firstActiveItem = () => {
  store.defaultItem.forEach((parent) => {
    if (shouldExit) {
      return; // Skip execution if flag is already true
    }
    activeGroup.value = parent;
    if (parent.exercise.length > 0) {
      activeExercise = parent.exercise[0];
      shouldExit = true; // Set flag after processing the first exercise
      return;
    }
  });
};

// const startExcersice = () => {
//   firstActiveItem();
//   activeGroup.active = true;
//   // store.defaultItem.forEach((parent) => {
//   //   var x = 0;
//   //   parent.active = true;
//   //   while (x < parent.repeats) {
//   //     parent.exercise.forEach((child) => {
//   //       counterDuration.value = parseInt(child.duration);
//   //       initDuration.value = parseInt(child.duration);
//   //       child.active = true;
//   //       startTimer();
//   //       exerciseIntervalId = setTimeout(() => {
//   //         if (counterDuration.value === 0) clearInterval(exerciseIntervalId);
//   //       }, 1000);
//   //       child.active = false;
//   //     });
//   //     x++;
//   //   }
//   //   parent.active = false;
//   // });
// };

// const counterDuration = computed(() => {
//   return props.duration;
// });
// const numToMin = (val) => {
//   return Math.floor(val / 60);
// };

// const numToSec = (val) => {
//   return Math.floor(val % 60);
// };

watch(isStarted, () => {
  if (isStarted.value) {
    startTimer();
    //startExcersice();
  } else {
    stopTimer();
  }
});
</script>

<style></style>

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
  </div>
</template>

<script lang="ts" setup>
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
const counterDuration = ref(duration);
const initDuration = ref(duration);

let resetCounter = () => {
  counterDuration.value = initDuration.value;
  timer.value = 100;
};
onMounted(() => {});
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
};

// const counterDuration = computed(() => {
//   return props.duration;
// });
const numToMin = (val) => {
  return Math.floor(val / 60);
};

const numToSec = (val) => {
  return Math.floor(val % 60);
};

watch(isStarted, () => {
  console.log(isStarted);
  if (isStarted.value) {
    startTimer();
  } else {
    stopTimer();
  }
});
</script>

<style></style>

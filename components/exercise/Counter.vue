<template>
  <div class="text-center q-ml-sm">
    <q-knob
      show-value
      font-size="48px"
      class="q-ma-md"
      v-model="timer"
      size="300px"
      :thickness="0.05"
      color="primary"
      track-color="grey-2"
      readonly
    >
      {{ numToMin(counterDuration) }}мин. {{ numToSec(counterDuration) }}сек.
    </q-knob>

    <br />
    {{ store.activeGroup.name }}

    <br />
    {{ showExerciseName() }}
  </div>
</template>

<script lang="ts" setup>
import { useExcerciseStore } from "~/stores/exercise";
const store = useExcerciseStore();

const emits = defineEmits(["stopTimer"]);
const props = defineProps({
  isStarted: {
    type: Boolean,
    default: false,
  },
});

let counterDuration: number = ref(0);

const initDuration = computed(() => store.getActiveExcerciseDuration());
const grpIndex: number = ref(0);
const exrIndex: number = ref(0);
let timer = ref(100);
let intervalId: number;

onMounted(() => {
  store.resetCurrentItem();
  grpIndex.value = store.getInitialActiveGroup();
});
let resetCounter = () => {
  timer.value = 100;
  grpIndex.value = 0;
  exrIndex.value = 0;
  //counterDuration.value = 0;
};

const resetTraining = () => {
  store.resetActive();
  resetCounter();
  emits("stopTimer");
  store.getInitialActiveGroup();
};

defineExpose({
  resetTraining,
});

const showExerciseName = () => {
  const index = store.getActiveExcerciseIndex();
  try {
    return index > 0
      ? store.activeGroup.exercise[index].name
      : store.activeGroup.exercise[0].name;
  } catch (error) {}
};
const startTimer = () => {
  if (store.calculateDuration() === 0) return; // no exercises available
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
    counterDuration.value = store.getActiveExcerciseDuration();
  } //counter duration ===0

  intervalId = setInterval(() => {
    //reached to end of exercise
    if (counterDuration.value === 0) {
      clearInterval(intervalId);
      store.setActiveExercise(exrIndex.value, false);
      exrIndex.value++;
      startTimer();
      //if (exrIndex.value+1>)
    } else {
      counterDuration.value--;
      timer.value = (counterDuration.value / initDuration.value) * 100;
      //console.log(timer.value);
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
  () => store.getActiveExcerciseDuration(),
  (newVal) => {
    //console.log(newVal);
    counterDuration.value = newVal;
    //initDuration.value = newVal;
  },
  { deep: true }
);

watch(
  () => store.defaultItem,
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

// let shouldExit = false;
// const getActiveItem = () => {
//   store.defaultItem.forEach((parent) => {
//     if (shouldExit) {
//       return; // Skip execution if flag is already true
//     }
//     activeGroup.value = parent;
//     if (parent.exercise.length > 0) {
//       activeExercise = parent.exercise[0];
//       shouldExit = true; // Set flag after processing the first exercise
//       return;
//     }
//   });
// };

// watch(
//   store.activeGroup,
//   (val, oldval) => {
//     console.log(val);
//     console.log(oldval);
//   },
//   { deep: true }
// );
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
</script>

<style></style>

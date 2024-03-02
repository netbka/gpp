<template>
  <div class="back_main">
    <div class="row window-height-100 justify-evenly">
      <div class="col-6 q-pl-sm">
        <!-- <ExerciseVideo :videoId="'321'"></ExerciseVideo> -->
        <ClientOnly>
          <ExerciseCounter ref="childcounter"></ExerciseCounter>
        </ClientOnly>
        <ExerciseBtnCtrl @restart="restart"></ExerciseBtnCtrl>
      </div>
      <div class="col-6 self-start">
        <ExerciseTabs></ExerciseTabs>
      </div>
    </div>
  </div>
</template>

<script setup>
const childcounter = ref(null);
const exercise = ref(null);

//let startTimer = ref(false);
//let duration = ref(60);
// const execTimer = (val) => {
//   startTimer.value = val;
// };

const restart = () => {
  childcounter.value.resetTraining();
  //childcounter.value.resetCounter();
};
const stopTimer = () => {
  exercise.value.resetTraining();
};
</script>

<style scoped>
.pic {
}
</style>

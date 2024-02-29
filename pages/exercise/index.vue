<template>
  <div class="back_main">
    <div class="row window-height-100 justify-evenly">
      <div class="col-6 q-pa-md self-center">
        <ClientOnly>
          <ExerciseCounter
            :isStarted="startTimer"
            :duration="duration"
            ref="childcounter"
            @stopTimer="stopTimer"
          ></ExerciseCounter>
        </ClientOnly>
      </div>
      <div class="col-6 self-start">
        <ExerciseSetting
          @start="execTimer"
          @restart="restart"
          ref="exercise"
        ></ExerciseSetting>
      </div>
    </div>
  </div>
</template>

<script setup>
const childcounter = ref(null);
const exercise = ref(null);

let startTimer = ref(false);
let duration = ref(60);
const execTimer = (val) => {
  startTimer.value = val;
};

const restart = () => {
  childcounter.value.resetCounter();
  //childcounter.value.resetCounter();
};
const stopTimer = () => {
  exercise.value.stopTimer();
};
// <ExerciseCounter></ExerciseCounter>
// <ExerciseSetting></ExerciseSetting>
</script>

<style scoped>
.pic {
}
</style>

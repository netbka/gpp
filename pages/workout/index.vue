<template>
  <div class="q-mt-md">
    <q-tabs
      v-model="tab"
      dense
      class="bg-blue-2 text-black shadow-1"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="workout" label="Занятие" />
      <q-tab name="training" label="Планы" />
      <q-tab name="start" label="Старт" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated class="q-pa-none">
      <q-tab-panel name="workout">
        <WorkoutSetting ref="workout"></WorkoutSetting>
      </q-tab-panel>

      <q-tab-panel name="training">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
      <q-tab-panel name="start">
        <ClientOnly>
          <WorkoutCounter ref="childcounter"></WorkoutCounter>
        </ClientOnly>
        <WorkoutBtnCtrl @restart="restart"></WorkoutBtnCtrl>
      </q-tab-panel>
    </q-tab-panels>
    <!-- <workoutVideo :videoId="'321'"></workoutVideo> -->
  </div>
</template>

<script setup>
const childcounter = ref(null);
const workout = ref(null);

//let startTimer = ref(false);
//let duration = ref(60);
// const execTimer = (val) => {
//   startTimer.value = val;
// };
const tab = ref("workout");
const restart = () => {
  childcounter.value.resetTraining();
  //childcounter.value.resetCounter();
};
const stopTimer = () => {
  workout.value.resetTraining();
};
</script>

<style scoped>
.pic {
}
</style>

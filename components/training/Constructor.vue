<template>
  <div>
    <TrainingBtnControls
      @setDuration="setDuration"
      @addGroup="addGroup"
      @start="start"
      @onSaveTraining="onSaveTraining"
    ></TrainingBtnControls>
    <BaseNested
      :data="item.exerciseGroup"
      @onAddExercise="onAddExercise"
      @onDeleteGroup="onDeleteGroup"
      @onDeleteExercise="onDeleteExercise"
      @onUpdateExercise="onUpdateExercise"
      @onUpdateGroup="onUpdateGroup"
    ></BaseNested>
    <BaseInitCounter ref="initCounter"></BaseInitCounter>
    <TrainingCounter ref="trainingCounter"></TrainingCounter>
  </div>
</template>

<script lang="ts" setup>
const store = trainingStore();
const item = computed(() => store.getCurrentItem);
const storeExerciseGroup = exerciseGroupStore();
const storeExercise = exerciseStore();

const onDeleteExercise = async (id: Number) => {
  await storeExercise.deleteItem(id);
  removeNestedItemFromArr(id, store.currentItem.exerciseGroup);
};

const onAddExercise = async (item: ExerciseGroup) => {
  if (store.currentItem.exerciseGroup.length > 0) {
    var exercise = await storeExercise.newExercise(item.id);
    item.exercise.push(exercise);
  }
};

const onUpdateExercise = async (id, exerciseTemplate) => {
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);
  exercise = await storeExercise.cloneTemplateItem(exerciseTemplate, exercise);
  updateNestedItem(exercise, store.currentItem.exerciseGroup);
};
const onSaveTraining = () => {
  store.updateTrainingPlan();
};
const addGroup = async () => {
  storeExerciseGroup.resetCurrentItem(
    store.currentItem.id,
    store.currentItem.exerciseGroup.length
  );
  const group = await storeExerciseGroup.create();

  updateArray(group, store.currentItem.exerciseGroup);
};

const onUpdateGroup = async (field, value, id) => {
  await storeExerciseGroup.updateItemField(
    field,
    value,
    id,
    store.currentItem.exerciseGroup
  );
};
const onDeleteGroup = async (id: Number) => {
  await storeExerciseGroup.deleteItem(id);
  removeItemFromArr(id, store.currentItem.exerciseGroup);
};
const setDuration = (val) => {
  store.setDuration(val);
};
const initCounter = ref(null);
const start = async (val) => {
  await initCounter.value.start();
  store.isStarted = true;
};

const trainingcounter = ref(null);
const restart = () => {
  trainingcounter.value.resetTraining();
};
//todo add buttons to counter
const stopTimer = () => {
  workout.value.resetTraining();
};
</script>

<style></style>

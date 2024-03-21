<template>
  <div>
    <TrainingBtnControls
      @setDuration="setDuration"
      @start="start"
      @onSaveTraining="confirmAddTrainingDescription"
    ></TrainingBtnControls>

    <BaseNested
      :data="item.exerciseGroup"
      @onAddExercise="onAddExercise"
      @onDeleteGroup="onDeleteGroup"
      @onDeleteExercise="onDeleteExercise"
      @onUpdateExercise="onUpdateExercise"
      @onUpdateGroup="onUpdateGroup"
      @onUpdateExerciseField="onUpdateExerciseField"
    ></BaseNested>

    <BaseInitCounter ref="initCounter"></BaseInitCounter>
    <TrainingCounter ref="trainingCounter"></TrainingCounter>

    <BaseFab @newItem="addGroup"></BaseFab>
    <BaseYesNoDialog
      ref="dialog"
      @ok="addDescription"
      @cancel="onSaveTraining"
      propHeader="Добавить описание?"
      propOkText="Да"
      propOkColor="green"
      propCancelText="Нет"
      :propBody="description"
    ></BaseYesNoDialog>
  </div>
</template>

<script lang="ts" setup>
const dialog = ref(null);
const store = trainingStore();
const item = computed(() => store.getCurrentItem);
const storeExerciseGroup = exerciseGroupStore();
const storeExercise = exerciseStore();
const description = ref("");

const confirmAddTrainingDescription = () => {
  description.value = exerciseToText(store.currentItem.exerciseGroup);
  dialog.value.show();
};

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

const addDescription = async () => {
  store.currentItem.description = description.value;
  await onSaveTraining();
};

const onSaveTraining = async () => {
  await store.updateTrainingPlan();
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

const onUpdateExerciseField = async (field, val, id) => {
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);
  await storeExercise.updateItemField(field, val, id, exercise);
};

const onDeleteGroup = async (id: Number) => {
  await storeExerciseGroup.deleteItem(id);
  removeItemFromArr(id, store.currentItem.exerciseGroup);
};
const setDuration = async (val) => {
  await store.setDuration(val);
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
//todo add mute button to counter
const stopTimer = () => {
  workout.value.resetTraining();
};
</script>

<style></style>

<template>
  <div>
    <TrainingBtnControls
      @setDuration="setDuration"
      @start="showTrainingCounter"
      @onSaveTraining="confirmAddTrainingDescription"
      @addGroup="addGroup"
      :readOnly="readOnly"
    ></TrainingBtnControls>
    <q-skeleton height="650px" square v-show="store.loading" />
    <BaseNested
      v-show="!store.loading"
      :readOnly="readOnly"
      :data="store.currentItem.exerciseGroup"
      @onAddExercise="onAddExercise"
      @onDeleteGroup="onDeleteGroup"
      @onDeleteExercise="onDeleteExercise"
      @onUpdateExercise="onUpdateExercise"
      @onUpdateGroup="onUpdateGroup"
      @onAddCustomExercise="onAddCustomExercise"
    ></BaseNested>

    <!-- <TrainingCounterCountdown ref="initCounter"></TrainingCounterCountdown> -->
    <ClientOnly>
      <TrainingCounter ref="trainingCounter"></TrainingCounter>
    </ClientOnly>
    <!-- <BaseFab @newItem="addGroup" v-if="!props.readOnly"></BaseFab> -->
    <BaseDialogYesNo
      ref="dialog"
      @ok="addDescription"
      @cancel="onSaveTraining"
      propHeader="Добавить описание?"
      propOkText="Да"
      propOkColor="green"
      propCancelText="Нет"
      :propBody="description"
    ></BaseDialogYesNo>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const dialog = ref(null);
const trainingCounter = ref(null);
const description = ref("");

const store = trainingStore();

const confirmAddTrainingDescription = () => {
  description.value = exerciseToText(store.currentItem.exerciseGroup);
  dialog.value.show();
};

const storeExercise = exerciseStore();
const crudExercise = useClientCrud(storeExercise);
const onAddExercise = async (item: ExerciseGroup) => {
  if (store.currentItem.exerciseGroup.length > 0) {
    storeExercise.newCurrentItem(item.id);
    await crudExercise.createItem();
    item.exercise.push(storeExercise.currentItem);
  }
};

const onDeleteExercise = async (id: Number) => {
  await crudExercise.deleteItem(id);
  removeNestedItemFromArr(id, store.currentItem.exerciseGroup);
};

const onAddCustomExercise = async (id, name: string) => {
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);
  storeExercise.cloneExerciseItem(exercise, name, null);
  await crudExercise.updateItem();
  updateNestedItem(storeExercise.currentItem, store.currentItem.exerciseGroup);
};

const onUpdateExercise = async (id, exerciseTemplate) => {
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);
  storeExercise.cloneTemplateItem(exerciseTemplate, exercise);
  await crudExercise.updateItem();
  updateNestedItem(storeExercise.currentItem, store.currentItem.exerciseGroup);
};

const addDescription = async () => {
  store.currentItem.description = description.value;
  await onSaveTraining();
};

const onSaveTraining = async () => {
  await store.updateTrainingPlan();
};

const storeExerciseGroup = exerciseGroupStore();
const crudExerciseGroup = useClientCrud(storeExerciseGroup);

const addGroup = async () => {
  storeExerciseGroup.resetCurrentItem(
    store.currentItem.id,
    store.currentItem.exerciseGroup.length
  );
  await crudExerciseGroup.createItem();
  updateArray(storeExerciseGroup.currentItem, store.currentItem.exerciseGroup);
};

const onUpdateGroup = async (field, value, id) => {
  storeExerciseGroup.itemArray = Object.assign([], store.currentItem.exerciseGroup);
  await crudExerciseGroup.updateItemField(field, value, id);
};
const onDeleteGroup = async (id: Number) => {
  await crudExerciseGroup.deleteItem(id);

  removeItemFromArr(id, store.currentItem.exerciseGroup);
};

const setDuration = async (val) => {
  await store.setDuration(val);
};
// const initCounter = ref(null);
const showTrainingCounter = (val) => {
  //await initCounter.value.start();
  //store.isStarted = true;
  trainingCounter.value.show();
};
//const trainingCounter = ref(null);
// const restart = () => {
//   trainingCounter.value.resetTraining();
// };
//todo add mute button to counter
// const stopTimer = () => {
//   workout.value.resetTraining();
// };
//const duration = ref({ min: 0, sec: 0 });
</script>

<style></style>

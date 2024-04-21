<template>
  <div>
    <TrainingBtnControls
      @setDuration="setDuration"
      @start="start"
      @onSaveTraining="confirmAddTrainingDescription"
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
      @onUpdateExerciseField="onUpdateExerciseField"
      @onAddCustomExercise="onAddCustomExercise"
    ></BaseNested>

    <BaseInitCounter ref="initCounter"></BaseInitCounter>
    <ClientOnly>
      <TrainingCounter ref="trainingCounter"></TrainingCounter>
    </ClientOnly>
    <BaseFab @newItem="addGroup" v-if="!props.readOnly"></BaseFab>
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
    storeExercise.resetCurrentItem(undefined, item.id);
    await crudExercise.createItem();
    //console.log(storeExercise.currentItem);
    item.exercise.push(storeExercise.currentItem);
  }
};

const onDeleteExercise = async (id: Number) => {
  //await storeExercise.deleteItem(id);
  await crudExercise.deleteItem(id);
  removeNestedItemFromArr(id, store.currentItem.exerciseGroup);
};

const onAddCustomExercise = async (id, val) => {
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);
  await storeExercise.updateCustomExercise(exercise, val);
  updateNestedItem(storeExercise.currentItem, store.currentItem.exerciseGroup);
};

const onUpdateExercise = async (id, exerciseTemplate) => {
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);
  await storeExercise.cloneTemplateItem(exerciseTemplate, exercise);
  updateNestedItem(storeExercise.currentItem, store.currentItem.exerciseGroup);
};

const addDescription = async () => {
  store.currentItem.description = description.value;
  await onSaveTraining();
};

const onSaveTraining = async () => {
  await store.updateTrainingPlan();
};

const onUpdateExerciseField = async (field, val, id) => {
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);
  await storeExercise.updateItemField(field, val, id, exercise);
};

const storeExerciseGroup = exerciseGroupStore();
const crudExerciseGroup = useClientCrud(storeExerciseGroup);

const addGroup = async () => {
  storeExerciseGroup.resetCurrentItem(
    store.currentItem.id,
    store.currentItem.exerciseGroup.length
  );
  //const group = await storeExerciseGroup.create();
  //updateArray(group, store.currentItem.exerciseGroup);
  await crudExerciseGroup.createItem();
  updateArray(storeExerciseGroup.currentItem, store.currentItem.exerciseGroup);
};

const onUpdateGroup = async (field, value, id) => {
  storeExerciseGroup.itemArray = Object.assign([], store.currentItem.exerciseGroup);

  await crudExerciseGroup.updateItemField(field, value, id);
  // await storeExerciseGroup.updateItemField(
  //   field,
  //   value,
  //   id,
  //   store.currentItem.exerciseGroup
  // );
};
const onDeleteGroup = async (id: Number) => {
  await crudExerciseGroup.deleteItem(id);
  //await storeExerciseGroup.deleteItem(id);
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

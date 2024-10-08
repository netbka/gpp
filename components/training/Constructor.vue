<template>
  <div>
    <TrainingBtnControls
      @setDuration="setDuration"
      @start="showTrainingCounter"
      @onSaveTraining="confirmAddTrainingDescription"
      @addGroup="addGroup"
      :readOnly="!canEditDelete"
    ></TrainingBtnControls>
    <!-- <q-skeleton height="650px" square v-show="store.loading" /> -->
    <BaseNested
      v-show="!store.loading"
      :readOnly="!canEditDelete"
      :data="store.currentItem.exerciseGroup"
      @onAddExercise="onAddExercise"
      @onUpdateExerciseField="onUpdateExerciseField"
      @onDeleteGroup="onDeleteGroup"
      @onDeleteExercise="onDeleteExercise"
      @onUpdateExercise="onUpdateExercise"
      @onUpdateGroup="onUpdateGroup"
      @onAddCustomExercise="onAddCustomExercise"
    ></BaseNested>

    <ClientOnly>
      <TrainingWorkoutapp ref="workoutapp"></TrainingWorkoutapp>
    </ClientOnly>
    <!-- @cancel="onSaveTraining" -->
    <BaseDialogYesNo
      ref="dialog"
      @ok="onSaveTrainingPlan"
      :propHeader="$t('components.training.constructor.header') + ' ?'"
      :propOkText="$t('components.training.constructor.ok')"
      propOkColor="green"
      :propCancelText="$t('components.training.constructor.cancel')"
      :propBody="description"
    ></BaseDialogYesNo>
    <q-inner-loading :showing="store.loading">
      <q-spinner-box size="100px" color="primary" />
      <div class="text-h3">{{ $t("components.training.constructor.saving") }}</div>
    </q-inner-loading>
  </div>
</template>

<script lang="ts" setup>
// const props = defineProps({
//   readOnly: {
//     type: Boolean,
//     default: false,
//   },
// });
const dialog = ref(null);
const workoutapp = ref(null);
const description = ref("");

const store = trainingStore();
const { canEditDelete } = useCanEditDelete(store);

const confirmAddTrainingDescription = () => {
  description.value = exerciseToText(
    store.currentItem.exerciseGroup,
    store.currentItem.name,
    durationToText(store.getDuration)
  );
  dialog.value.show();
};

const storeExercise = exerciseStore();
const crudExercise = useClientCrud(storeExercise);
const onAddExercise = async (item: ExerciseGroup) => {
  if (store.currentItem.exerciseGroup.length > 0) {
    storeExercise.newCurrentItem(item.id);
    let result = await crudExercise.createItem();

    if (result) item.exercise.push(storeExercise.currentItem);
  }
};
const onUpdateExerciseField = async (field, val, id) => {
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);

  await crudExercise.updateItemField(field, val, id, exercise);
};

const onDeleteExercise = async (id: Number) => {
  await crudExercise.deleteItem(id);
  removeExerciseItemFromGroup(id, store.currentItem.exerciseGroup);
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

const crudTraining = useClientCrud(store);
const onSaveTrainingPlan = async () => {
  store.currentItem.duration = store.getDuration;
  store.currentItem.description = description.value;
  await crudTraining.updateItem();
  //await store.updateTrainingPlan();
  //await onSaveTraining();
};

// const onSaveTraining = async () => {
//   await store.updateTrainingPlan();
// };

const storeExerciseGroup = exerciseGroupStore();
const crudExerciseGroup = useClientCrud(storeExerciseGroup);

const addGroup = async () => {
  storeExerciseGroup.resetCurrentItem(
    store.currentItem.id,
    store.currentItem.exerciseGroup.length
  );
  var result = await crudExerciseGroup.createItem();
  if (result)
    updateArray(storeExerciseGroup.currentItem, store.currentItem.exerciseGroup);
};

const onUpdateGroup = async (field, value, id) => {
  storeExerciseGroup.itemArray = Object.assign([], store.currentItem.exerciseGroup);
  await crudExerciseGroup.updateItemField(field, value, id);
};
const onDeleteGroup = async (id: Number) => {
  await crudExerciseGroup.deleteItem(id, store.currentItem.exerciseGroup);
  //removeItemFromArr(id, store.currentItem.exerciseGroup);
};

const setDuration = async (val) => {
  await store.setDuration(val);
};
// const initCounter = ref(null);
const showTrainingCounter = (val) => {
  //await initCounter.value.start();
  //store.isStarted = true;
  workoutapp.value.show();
};
</script>

<style></style>

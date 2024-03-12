<template>
  <div>
    <BaseNested
      :data="item.exerciseGroup"
      @onAddExercise="onAddExercise"
      @onDeleteGroup="onDeleteGroup"
      @onDeleteExercise="onDeleteExercise"
      @onUpdateExercise="onUpdateExercise"
      @onUpdateGroup="onUpdateGroup"
    ></BaseNested>
  </div>
</template>

<script lang="ts" setup>
const store = trainingStore();
const item = computed(() => store.getCurrentItem);
const storeExerciseGroup = exerciseGroupStore();
const storeExercise = exerciseStore();
const onDeleteGroup = async (id: Number) => {
  await storeExerciseGroup.deleteItem(id);
  removeItemFromArr(id, store.currentItem.exerciseGroup);
};
const onDeleteExercise = async (id: Number) => {
  await storeExercise.deleteItem(id);
  removeNestedItemFromArr(id, store.currentItem.exerciseGroup);
};

const onAddExercise = async (item: ExerciseGroup) => {
  if (store.currentItem.exerciseGroup.length > 0) {
    var exercise = await storeExercise.newExercise(item.id);
    // console.log(item);
    // if (store.currentItem.exerciseGroup.length > 0) {
    // }
    item.exercise.push(exercise);

    // updateArray(_item, store.currentItem.exerciseGroup[0].exercise);
  }
};
const onUpdateExercise = async (id, exerciseTemplate) => {
  //console.log("id", id, exerciseTemplate);
  let exercise = findExerciseById(store.currentItem.exerciseGroup, id);
  exercise = await storeExercise.cloneTemplateItem(exerciseTemplate, exercise);
  updateNestedItem(exercise, store.currentItem.exerciseGroup);
  // console.log(exercise);
  //updateNestedItem(val, store.currentItem.exerciseGroup);
};

const onUpdateGroup = async (field, value, id) => {
  await storeExerciseGroup.updateItemField(
    field,
    value,
    id,
    store.currentItem.exerciseGroup
  );
};
</script>

<style></style>

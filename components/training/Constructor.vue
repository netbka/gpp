<template>
  <div>
    <BaseNested
      :data="item.excerciseGroup"
      @onAdd="onAdd"
      @onDelete="onDelete"
      @onUpdateExercise="onUpdateExercise"
    ></BaseNested>
  </div>
</template>

<script lang="ts" setup>
const store = trainingStore();
const item = computed(() => store.getCurrentItem);
const storeExerciseGroup = exerciseGroupStore();
const storeExercise = exerciseStore();
const onDelete = async (id: Number) => {
  await storeExerciseGroup.deleteItem(id);
  removeItemFromArr(id, store.currentItem.excerciseGroup);
};

const onAdd = (item: ExerciseGroup) => {
  if (store.currentItem.excerciseGroup.length > 0) {
    var exercise = storeExercise.newExercise();
    // console.log(item);
    // if (store.currentItem.excerciseGroup.length > 0) {
    // }
    item.exercise.push(exercise);

    // updateArray(_item, store.currentItem.excerciseGroup[0].exercise);
  }
};
const onUpdateExercise = (val) => {
  console.log(store.currentItem.excerciseGroup);
  updateNestedItem(val, store.currentItem.excerciseGroup);
};
</script>

<style></style>

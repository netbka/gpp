<template>
  <div>
    <BaseNested
      :data="item.excerciseGroup"
      @onAdd="onAdd"
      @onDelete="onDelete"
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
    var item = storeExercise.newExercise();
    updateArray(item, store.currentItem.excerciseGroup[0].exercise);
  }
};
</script>

<style></style>

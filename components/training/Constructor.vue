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

const onDelete = (id: Number) => {
  console.log(id);
};

const onAdd = (item: ExerciseGroup) => {
  console.log(item);
};
</script>

<style></style>

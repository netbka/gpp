<template>
  <div class="row shadow-1 q-col-gutter-lg q-pa-md">
    <div class="col-6">
      <ExerciseForm></ExerciseForm>
    </div>
    <div class="col-6">
      <ExerciseList></ExerciseList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useExerciseStore } from "~/stores/exercise";
const store = useExerciseStore();
onMounted(async () => {
  await store.fetchAll();
});
</script>

<style></style>

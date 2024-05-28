<template>
  <div>
    <div class="text-light-blue-7 text-h4 text-uppercase text-center">
      {{ store.activeGroup.name }}
    </div>
    <div class="text-light-blue-10 text-h4 text-center">
      {{ showExerciseName() }}
    </div>
    <div class="row justify-center">
      <div class="exercise-image text-center">
        <q-img
          :src="exerciseImage"
          :error-src="errorImg"
          fit="scale-down"
          class="exercise-image"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  exerciseName: {
    type: String,
    default: "",
  },
});
const store = useTrainingStore();
const { getImageUrl } = useImageManager();
const { exrIndex } = useTrainingExercise();
import errorImg from "/build_transparent_150.png";
const exerciseImage = computed(() => {
  try {
    let fileName = store.activeGroup.exercise[exrIndex.value].templateId;

    return store.activeGroup.exercise[exrIndex.value].templateId !== null
      ? getImageUrl(fileName, "exerciseTemplate")
      : null;
  } catch (error) {
    console.log("error");
    return null;
  }
});

const { showExerciseName } = useTrainingExercise();
</script>

<style scoped>
.exercise-image {
  height: calc(100vh / 3);
  object-fit: scale-down;
  max-width: 1200px;
  width: 350px;
}
</style>

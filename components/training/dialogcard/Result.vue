<template>
  <div>
    <div class="text-light-blue-7 text-h4 text-uppercase text-center">
      Тренировка завершена
    </div>
    <div class="text-light-blue-10 text-h4 text-center">Ты молодец!</div>
    <q-scroll-area class="scroll-height" :bar-style="barStyle()">
      <div class="row justify-center">
        <div class="col-auto">
          <div class="text-blue-10" v-html="description()"></div>
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script lang="ts" setup>
const store = useTrainingStore();
const description = () => {
  return exerciseToText(
    store.currentItem.exerciseGroup,
    store.currentItem.name,
    durationToText(store.getDuration)
  );
};
</script>

<style></style>

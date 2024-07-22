<template>
  <div>
    <div class="text-light-blue-7 text-h4 text-uppercase text-center">
      {{ $t("components.training.dialogcard.header") }}
    </div>
    <div class="text-light-blue-10 text-h4 text-center">
      {{ $t("components.training.dialogcard.subheader") }}!
    </div>
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

<template>
  <div class="row q-col-gutter-sm">
    <div class="col-4">
      <q-btn
        outline
        color="primary"
        class="full-width"
        label="45 сек."
        @click="setDuration(45)"
        size="sm"
      />
    </div>
    <div class="col-4">
      <q-btn
        outline
        color="primary"
        class="full-width"
        label="60 сек."
        @click="setDuration(60)"
        size="sm"
      />
    </div>
    <div class="col-4">
      <q-btn
        outline
        color="primary"
        class="full-width"
        label="90 сек."
        @click="setDuration(90)"
        size="sm"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useExcerciseStore } from "~/stores/exercise";
const store = useExcerciseStore();
const setDuration = (val) => {
  store.setDuration(val);
};
</script>

<style></style>

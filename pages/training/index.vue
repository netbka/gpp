<template>
  <div class="row shadow-1 q-pa-md">
    <q-page-sticky position="top" :offset="[0, -32]" style="z-index: 9999">
      <q-fab icon="add" color="accent" @click="newItem()"> </q-fab>
    </q-page-sticky>
    <TrainingForm ref="form"></TrainingForm>
    <div class="col-12">
      <TrainingList @edit="show()"></TrainingList>
    </div>
  </div>
</template>

<script lang="ts" setup>
const form = ref(null);

const store = useTrainingStore();
const newItem = () => {
  store.resetCurrentItem();
  show();
};

const show = () => {
  form.value.show();
};
</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

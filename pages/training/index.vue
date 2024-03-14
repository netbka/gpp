<template>
  <div class="row shadow-1 q-py-sm q-px-xs">
    <!-- <q-page-sticky position="bottom" :offset="[0, 0]" style="z-index: 9999">
      <q-fab icon="add" color="accent" @click="newItem()"> </q-fab>
    </q-page-sticky> -->
    <BaseFab @newItem="newItem"></BaseFab>
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

<template>
  <div class="shadow-1">
    <BaseFab @newItem="newItem"></BaseFab>
    <TrainingForm ref="form"></TrainingForm>
    <TrainingTable @edit="show"></TrainingTable>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: true });
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

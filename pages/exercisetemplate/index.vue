<template>
  <div class="row shadow-1">
    <q-page-sticky position="top" :offset="[0, -32]" style="z-index: 999">
      <q-fab icon="add" color="accent" @click="newItem()"> </q-fab>
    </q-page-sticky>
    <ExercisetemplateForm ref="form"></ExercisetemplateForm>
    <div class="col-12">
      <ExercisetemplateList @edit="show()"></ExercisetemplateList>
    </div>
  </div>
</template>
<script lang="ts" setup>
const form = ref(null);

const store = useExerciseTemplateStore();
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

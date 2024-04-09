<template>
  <div>
    <BaseFab @newItem="newItem"></BaseFab>
    <ExercisetemplateForm ref="form"></ExercisetemplateForm>

    <ExercisetemplateTable @edit="show"></ExercisetemplateTable>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ auth: true });
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

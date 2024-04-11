<template>
  <div>
    <ContentHero
      :header="'Подборка упражнений'"
      :subHeader="'Популярные упражнения от Просто ОФП'"
    ></ContentHero>
    <ExercisetemplateForm ref="form"></ExercisetemplateForm>
    <BaseFab @newItem="newItem" :readOnly="true"></BaseFab>
    <ExercisetemplateTable @edit="show" :readOnly="false"></ExercisetemplateTable>
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

<style scoped></style>

<template>
  <div>
    <ContentHero
      :header="'Подборка упражнений'"
      :subHeader="'Популярные упражнения от Просто ОФП'"
    ></ContentHero>

    <ExercisetemplateTable @edit="show" :readOnly="false"></ExercisetemplateTable>

    <ExercisetemplateForm ref="form"></ExercisetemplateForm>
    <BaseFab @newItem="newItem" :readOnly="false"></BaseFab>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ auth: false });
const form = ref(null);
const store = useExerciseTemplateStore();
store.newItem();
const newItem = () => {
  store.newItem();
  show();
};

const show = (id) => {
  form.value.show(id);
};
</script>

<style scoped></style>

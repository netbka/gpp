<template>
  <div class="shadow-1">
    <BaseFab @newItem="newItem"></BaseFab>
    <ExercisetemplateForm ref="form"></ExercisetemplateForm>
    <ExercisetemplateTable @edit="show"></ExercisetemplateTable>

    <!-- <div class="col-12">
      <ExercisetemplateList @edit="show()"></ExercisetemplateList>
    </div> -->
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ auth: true });
const form = ref(null);

const store = useExerciseTemplateStore();
onBeforeMount(async () => {
  //  await store.fetchAll();
});

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

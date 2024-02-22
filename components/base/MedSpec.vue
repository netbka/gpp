<template>
  <q-select
    v-model="store.currentItem"
    label="Medical Speciality"
    :options="store.items"
    lazy-rules
    clearable
    use-input
    hide-selected
    fill-input
    input-debounce="500"
    options-selected-class="text-deep-orange"
    outlined
    option-value="id"
    :loading="store.loading"
    option-label="name"
    @update:model-value="updateMedSpec"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }} </q-item-label>
          <q-item-label caption> {{ scope.opt.description }} </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedSpecId: {
    type: Number,
    default: 0,
  },
});
const { selectedSpecId } = props;

// watch(
//   () => selectedSpecId,
//   (newVal) => {
//     console.log(newVal);
//   }
// );

import { useMedSpecStore } from "~/stores/medspec";
const store = useMedSpecStore();
await store.fetchAll();
const updateMedSpec = (val) => {
  if (val === null) {
    useMedSpecStore().resetCurrentItem();
  }
};

onMounted(async () => {
  store.currentItem = selectedSpecId
    ? store.items.find((el) => el.id == selectedSpecId)
    : store.currentItem;

  //store.currentSubItem = selectedSubSpecIds;
});
</script>

<style scoped>
.q-select :deep(.q-field__native) > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>

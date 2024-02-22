<template>
  <q-select
    v-model="store.currentSubItem"
    label="Medical Sub Speciality"
    :options="store.currentItem.subspecs"
    lazy-rules
    clearable
    fill-input
    input-debounce="500"
    options-selected-class="text-deep-orange"
    outlined
    option-value="id"
    :loading="store.loading"
    option-label="name"
    multiple
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
  selectedSubSpecIds: {
    type: Array,
  },
});
const { selectedSubSpecIds } = props;

import { useMedSpecStore } from "~/stores/medspec";
const store = useMedSpecStore();
onMounted(async () => {
  store.currentSubItem = selectedSubSpecIds;
});

//await store.fetchAll();
</script>

<style scoped>
.q-select :deep(.q-field__native) > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
</style>

<template>
  <q-select
    dense
    v-model="store.currentItem"
    label="Группа мышц"
    :options="store.itemArray"
    lazy-rules
    clearable
    fill-input
    input-debounce="500"
    options-selected-class="text-deep-orange"
    outlined
    option-value="id"
    option-label="name"
    :loading="store.loading"
    :disable="props.loading"
    :input-style="{ fontSize: '12px' }"
    multiple
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }} </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedIds: {
    type: Array,
  },
  loading: {
    type: Boolean,
  },
});
const { selectedIds } = props;

const store = muscleStore();
const crud = useClientCrud(store);
await crud.fetchAll();

store.currentItem = props.selectedIds;

watch(
  () => props.selectedIds,
  (newVal) => {
    store.currentItem = newVal;
  },
  { deep: true }
);
</script>

<style scoped>
.q-select :deep(.q-field__native) > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 350px !important;
  font-size: 12px;
}
</style>

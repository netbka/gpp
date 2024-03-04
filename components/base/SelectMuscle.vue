<template>
  <q-select
    dense
    :model-value="modelValue"
    label="Группа мышц"
    :options="store.items"
    lazy-rules
    clearable
    fill-input
    input-debounce="500"
    options-selected-class="text-deep-orange"
    outlined
    option-value="id"
    :loading="store.loading"
    option-label="name"
    :input-style="{ fontSize: '12px' }"
    :rules="[(val) => validate(val)]"
    @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }} </q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <!-- v-model="store.currentItem" -->
    <!-- <template v-slot:selected-item="scope">
      <span>
        {{ scope.opt.name }}
      </span>
    </template> -->
  </q-select>
</template>

<script lang="ts" setup>
// const props = defineProps({
//   selectedId: {
//     type: Object,
//   },
// });
//const { selectedId } = props;

const props = defineProps({
  modelValue: {
    type: Object,
  },
});

import { useMuscleStore } from "~/stores/muscle";
const store = useMuscleStore();
store.fetchAll();
onMounted(async () => {
  // if (selectedId.id) store.currentItem = selectedId;
});
const validate = (val) => {
  if (val === null || !val.id || val.id < 1) return "Нужно выбрать значение";
};
//await store.fetchAll();
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

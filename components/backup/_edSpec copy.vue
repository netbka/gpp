<template>
  <div>
    <div class="row q-col-gutter-sm">
      <div class="col-6">
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
      </div>
      <div class="col-6">
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
          <!-- <template v-slot:selected-item="scope">
            
            <q-chip
              removable
              dense
              @remove="scope.removeAtIndex(scope.index)"
              :tabindex="scope.tabindex"
              color="blue"
              text-color="grey-10"
              class="q-ma-none ellipsis"
            >
              {{ scope.opt.name }}
            </q-chip>
          </template> -->
        </q-select>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedSpecId: {
    type: Number,
    default: 0,
  },
  selectedSubSpecIds: {
    type: Array,
  },
});
const { selectedSpecId, selectedSubSpecIds } = props;

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
  //console.log(val);
  if (val === null) {
    useMedSpecStore().resetCurrentItem();
  }
};

onMounted(async () => {
  //  await store.getAll();
  //      model.value = store.defaultArr.find((el) => el.Id == props.propSelectedId);
  //console.log(selectedSpecId);
  store.currentItem = selectedSpecId
    ? store.items.find((el) => el.id == selectedSpecId)
    : store.currentItem;
  //console.log(store.currentItem);
  //console.log(selectedSubSpecIds);
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
~/stores/sportType
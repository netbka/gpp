<template>
  <div>
    <TableCardTable
      @onRequest="onRequest"
      ref="tableRef"
      :rows="store.itemArray"
      :loading="pending"
      :readOnly="props.readOnly"
      :cardCaption="'Подробнее'"
      :cardLink="store.$id"
      @onEditItem="onEditItem"
      @onDeleteItem="onDeleteItem"
      @onUpdateField="onUpdateField"
    >
    </TableCardTable>
    <!-- :pagination="store.pagination" -->
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  readOnly: { Type: Boolean, default: false },
});
const storeuser = useProfileStore();
const store = useExerciseTemplateStore();
store.accesstoken = storeuser.accesstoken;
const crud = useSSRCrud(store);
const crudClient = useClientCrud(store);
const { data, pending, error, refresh } = await crud.searchItem();

const emits = defineEmits(["onEditItem"]);
const { onEditItem, onDeleteItem, onUpdateField } = useUseTableOperations(store, emits);
const cache = ref(false);
const onRequest = async (props) => {
  setPaginationAndFilter(store, props.pagination, props.filter);
  if (cache.value === true && props.pagination) {
    await refresh();
  }
  if (cache.value === false) {
    await refresh();
  }
  cache.value = true;

  //await refresh();
  if (data.value !== null) {
    store.itemArray = data.value.entity;
    store.pagination.rowsNumber = data.value.count;
  }
};
</script>

<style></style>

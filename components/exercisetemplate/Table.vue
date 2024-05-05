<template>
  <div>
    <TableCardTable
      @onRequest="onRequest"
      ref="tableRef"
      :rows="store.itemArray"
      :loading="pending"
      :readOnly="props.readOnly"
      :pagination="store.pagination"
      :cardCaption="'Подробнее'"
      :cardLink="store.$id"
      @onEditItem="onEditItem"
      @onDeleteItem="onDeleteItem"
      @onUpdateField="onUpdateField"
    >
    </TableCardTable>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  readOnly: { Type: Boolean, default: false },
});

const store = useExerciseTemplateStore();
const crud = useSSRCrud(store);
const crudClient = useClientCrud(store);
const { data, pending, error, refresh } = await crud.searchItem();

const emits = defineEmits(["onEditItem"]);
const { onEditItem, onDeleteItem, onUpdateField } = useUseTableOperations(store, emits);
const onRequest = async (props) => {
  setPaginationAndFilter(store, props.pagination, props.filter);
  await refresh();
  store.itemArray = data.value.result;
  store.pagination.rowsNumber = data.value.totalCount;
};
</script>

<style></style>

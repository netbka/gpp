<template>
  <div>
    <TableCardTable
      @onRequest="onRequest"
      ref="tableRef"
      :rows="data.result"
      :loading="pending"
      :showExecute="false"
      :showEdit="true"
      :showDelete="true"
      :readOnly="props.readOnly"
      :pagination="store.pagination"
      :cardCaption="'заниматься'"
      :cardLink="store.$id.toLowerCase()"
      @onEditItem="onEditItem"
      @onDeleteItem="onDeleteItem"
      @onUpdateField="onUpdateField"
      @onCloneItem="onCloneItem"
    >
    </TableCardTable>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  readOnly: { Type: Boolean, default: false }, //not properly implemented
});

const store = useTrainingStore();

const crud = useSSRCrud(store);
const crudClient = useClientCrud(store);
const { data, pending, error, refresh } = await crud.searchItem();

const emits = defineEmits(["onEditItem"]);
const { onEditItem, onDeleteItem, onUpdateField, onCloneItem } = useUseTableOperations(
  store,
  emits,
  data
);

const onRequest = async (props) => {
  setPaginationAndFilter(store, props.pagination, props.filter);
  await refresh();
  store.pagination.rowsNumber = data.value.totalCount;
};

//const tableRef = ref(null);
// const onEditItem = async (id) => {
//   emits("onEditItem", id);
// };
// const imageManager = useImageManager(store);
// const onDeleteItem = async (id) => {
//   await crudClient.deleteItem(id);
//   await imageManager.deleteFileUsingStorage(id);
// };
//const onUpdateField = async (field, val, id) => {};
</script>

<style></style>

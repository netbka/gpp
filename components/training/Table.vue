<template>
  <div>
    <TableCardTable
      @onRequest="onRequest"
      ref="tableRef"
      :rows="store.itemArray"
      :loading="pending"
      :readOnly="props.readOnly"
      :cardCaption="'Программа'"
      :cardCaptionSecondary="'Заниматься'"
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
const storeuser = useProfileStore();
const store = useTrainingStore();
store.accesstoken = storeuser.accesstoken;
const crud = useSSRCrud(store);
const crudClient = useClientCrud(store);
const { data, pending, error, refresh } = await crud.searchItem();

const emits = defineEmits(["onEditItem"]);
const { onEditItem, onDeleteItem, onUpdateField, onCloneItem } = useUseTableOperations(
  store,
  emits,
  data
);
const cache = ref(false);
const onRequest = async (props) => {
  setPaginationAndFilter(store, props.pagination, props.filter);
  if (cache.value === true && props.pagination) {
    console.log("onRequest", props);
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

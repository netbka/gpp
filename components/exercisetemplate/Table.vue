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
      :cardCaption="'Подробнее'"
      :cardLink="store.$id.toLowerCase()"
      @onEditItem="onEditItem"
      @onDeleteItem="onDeleteItem"
      @onUpdateField="onUpdateField"
    >
      <!--
       <template v-slot:cardComponent="prop">
        <ExercisetemplateCard
          :data="prop.prop.row"
          @editItem="onEditItem"
          @deleteItem="onDeleteItem"
          @onUpdateField="onUpdateField"
        ></ExercisetemplateCard>
      </template> -->
    </TableCardTable>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  readOnly: { Type: Boolean, default: false },
});

const store = useExerciseTemplateStore();
const crud = useSSRCrud(store);
const { data, pending, error, refresh, execute } = await crud.searchItem();

const tableRef = ref(null);
const emits = defineEmits(["onEditItem", "confirmDelete"]);

const onRequest = async (props) => {
  setPaginationAndFilter(store, props.pagination, props.filter);
  await refresh();
  store.pagination.rowsNumber = data.value.totalCount;
};

const onEditItem = async (id) => {
  emits("onEditItem", id);
};
const onDeleteItem = async (id) => {
  await crud.deleteItem(id);
};
const onUpdateField = async (field, val, id) => {
  //await store.updateItemField(field, val, id);
};
</script>

<style></style>

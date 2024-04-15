<template>
  <div>
    <TableCardTable
      :columns="exerciseTemplateEditableTableColumns()"
      :headerTitle="'Коллекция упражнений'"
      @onRequest="onRequest"
      ref="tableRef"
      :rows="data.result"
      :loading="pending"
      :showExecute="false"
      :showEdit="true"
      :showDelete="true"
      :readOnly="props.readOnly"
      :pagination="store.pagination"
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
const { data, pending, error, refresh, execute } = await searchItems(store);

const tableRef = ref(null);
const emits = defineEmits(["edit", "confirmDelete"]);

const onRequest = async (props) => {
  try {
    store.setPagination(props.pagination);
    store.filter = props.filter;
    await refresh();
    store.pagination.rowsNumber = data.value.totalCount;
  } catch (e) {
    console.log(e);
  }
};

const onEditItem = async (id) => {
  //store.currentItem = Object.assign({}, getById(id, store.itemArray));
  //await store.getById(id);
  emits("edit", id);
};
const onDeleteItem = async (id) => {
  await store.deleteItem(id);
};
const onUpdateField = async (field, val, id) => {
  await store.updateItemField(field, val, id);
};
</script>

<style></style>

<template>
  <div>
    <TableCardTable
      :columns="exerciseTemplateEditableTableColumns()"
      :headerTitle="'Коллекция упражнений'"
      @onRequest="onRequest"
      ref="tableRef"
      :rows="store.itemArray"
      :loading="store.loading"
      :showExecute="false"
      :showEdit="true"
      :showDelete="true"
      :readOnly="props.readOnly"
      :pagination="store.pagination"
      @onEditItem="onEditItem"
      @onDeleteItem="onDeleteItem"
      @onUpdateField="onUpdateField"
    >
      <!-- <template v-slot:cardComponent="prop">
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
const tableRef = ref(null);
const emits = defineEmits(["edit", "confirmDelete"]);
const tableData = ref([]);

await store.ssrSearch();

const onRequest = async (props) => {
  store.setPagination(props.pagination);
  await store.search(props.filter);
};

const onEditItem = async (id) => {
  //store.currentItem = Object.assign({}, getById(id, store.itemArray));
  await store.getById(id);
  emits("edit");
};
const onDeleteItem = async (id) => {
  await store.deleteItem(id);
};
const onUpdateField = async (field, val, id) => {
  await store.updateItemField(field, val, id);
};
</script>

<style></style>

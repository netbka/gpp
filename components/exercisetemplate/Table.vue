<template>
  <div>
    <!-- <TableEditable
      :columns="exerciseTemplateEditableTableColumns()"
      :headerTitle="'Упражнения'"
      @onRequest="onRequest"
      ref="tableRef"
      :rows="store.itemArray"
      :loading="store.loading"
      :rowsNumber="store.rowsNumber"
      :showExecute="false"
      :showEdit="true"
      :showDelete="true"
      @editItem="editItem"
      @deleteItem="deleteItem"
    >
      <template v-slot:editcontrol="prop">
        <TableInputWrapper
          @onUpdateField="onUpdateField"
          :propControlConfig="prop"
        ></TableInputWrapper>
      </template>
    </TableEditable> -->
    <TableCardTable
      :columns="exerciseTemplateEditableTableColumns()"
      :headerTitle="'Упражнения'"
      @onRequest="onRequest"
      ref="tableRef"
      :rows="store.itemArray"
      :loading="store.loading"
      :rowsNumber="store.rowsNumber"
      :showExecute="false"
      :showEdit="true"
      :showDelete="true"
      :readOnly="false"
      @editItem="editItem"
      @deleteItem="deleteItem"
      @onUpdateField="onUpdateField"
    >
    </TableCardTable>
  </div>
</template>

<script lang="ts" setup>
const store = useExerciseTemplateStore();
const tableRef = ref(null);
const emits = defineEmits(["edit", "confirmDelete"]);

const onRequest = async (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;
  await store.search(props);
  const baseUrl = "/api/exerciseTemplate/";
  const response = await $fetch(baseUrl + "search", {
    query: { filter: props.filter, ...props.pagination },
  });
  //store.itemArray = response.result;
  //store.rowsNumber = response.totalCount;
};

const editItem = (id) => {
  store.currentItem = Object.assign({}, getById(id, store.itemArray));
  emits("edit");
};
const deleteItem = async (id) => {
  await store.deleteItem(id);
};
const onUpdateField = async (field, val, id) => {
  await store.updateItemField(field, val, id);
};
</script>

<style></style>

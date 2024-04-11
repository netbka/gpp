<template>
  <div>
    <TableEditable
      :columns="trainingEditableTableColumns()"
      :headerTitle="'Тренировки'"
      @onRequest="onRequest"
      ref="tableRef"
      :rows="store.itemArray"
      :loading="store.loading"
      :rowsNumber="store.rowsNumber"
      :showEdit="true"
      :showDelete="true"
      @executeItem="executeItem"
      @editItem="editItem"
      @deleteItem="deleteItem"
    >
      <template v-slot:editcontrol="prop">
        <TableInputWrapper
          @onUpdateField="onUpdateField"
          :propControlConfig="prop"
        ></TableInputWrapper>
      </template>
    </TableEditable>
  </div>
</template>

<script lang="ts" setup>
const store = useTrainingStore();
const tableRef = ref(null);
const emits = defineEmits(["edit", "confirmDelete"]);

const onRequest = async (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;
  await store.searchOwn(props);
};

const executeItem = async (prop) => {
  var slug = prop.row.id + "-" + prop.row.name;
  const url = generateSlug(slug);
  await navigateTo({ path: "/training/" + url });
};
const editItem = (prop) => {
  store.currentItem = getById(prop.row.id, store.itemArray);
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

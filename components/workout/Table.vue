<template>
  <div>
    <TableEditable
      :columns="trainingTableColumns()"
      :headerTitle="'Тренировки'"
      @onRequest="onRequest"
      ref="tableRef"
      :rows="store.itemArray"
      :loading="store.loading"
      :rowsNumber="store.rowsNumber"
      @executeItem="executeItem"
    >
    </TableEditable>
  </div>
</template>

<script lang="ts" setup>
const store = useTrainingStore();
const tableRef = ref(null);

const onRequest = async (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination;
  const filter = props.filter;
  await store.search(props);
};

const executeItem = async (prop) => {
  var slug = prop.row.id + "-" + prop.row.name;
  const url = generateSlug(slug);
  await navigateTo({ path: "/workout/" + url });
};
</script>

<style></style>

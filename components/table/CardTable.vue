<template>
  <div>
    <q-table
      grid
      hide-header
      flat
      bordered
      ref="tableRef"
      class=""
      :rows="rows"
      :columns="columns"
      :row-key="(row) => row.id"
      :filter="filter"
      :loading="loading"
      v-model:pagination="pagination"
      binary-state-sort
      no-data-label="Нет данных"
      no-results-label="Ничего не найдено"
      @request="onRequest"
      :rows-per-page-options="[10, 20]"
      rows-per-page-label="показывать по"
      :loading-label="'Загружаю'"
      :pagination-label="(start, end, total) => `${start}-${end} из ${total}`"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top>
        <div class="q-table__title">{{ headerTitle }}</div>
        <q-space />
        <slot name="topinputs"> <div></div></slot>
        <q-space />

        <q-input
          class="q-ml-md"
          dense
          debounce="300"
          color="primary"
          label-color="black"
          v-model="filter"
          label="Поиск"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-12 col-lg-6">
          <TableCard
            :data="props.row"
            :cols="props.cols"
            :readOnly="readOnly"
            @onUpdateField="onUpdateField"
            @editItem="editItem"
          ></TableCard>
        </div>
      </template>
    </q-table>
    <BaseDialogYesNo ref="dialog" @ok="remove"></BaseDialogYesNo>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits([
  "onRequest",
  "executeItem",
  "editItem",
  "customAction",
  "deleteItem",
  "onUpdateField",
]);
const props = defineProps({
  propRowActions: { Type: Boolean, default: true },
  propActions: { Type: Boolean, default: true },
  loading: { Type: Boolean, default: false },
  headerTitle: { Type: String, default: "" },
  rows: { Type: Array, default: [] },
  columns: { Type: Array, default: [] },
  rowsNumber: { Type: Number, default: 0 },
  showExecute: { Type: Boolean, default: true },
  showEdit: { Type: Boolean, default: false },
  showDelete: { Type: Boolean, default: false },
  showCustom: { Type: Boolean, default: false },
  readOnly: { Type: Boolean, default: false },
  page: { Type: Object, default: {} },
});

//example of making props reactive
//const val = toRef(()=> props.rows)

const dialog = ref(null);
let filter = ref("");
const tableRef = ref(null);
const pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,

  rowsPerPage: 10,
  rowsNumber: 12,
});

//const pagination = toRef(() => props.page);

onMounted(async () => {
  updatePagination(props.page);
  //tableRef.value.requestServerInteraction();
});
const editItem = (id) => {
  emits("editItem", id);
};

const updatePagination = (prop) => {
  pagination.value.descending = prop.descending;
  pagination.value.sortBy = prop.sortBy;
  pagination.value.page = prop.page;
  pagination.value.rowsPerPage = prop.rowsPerPage;
  pagination.value.rowsNumber = prop.rowsNumber;
};

const onRequest = (prop) => {
  pagination.value.descending = prop.pagination.descending;
  pagination.value.sortBy = prop.pagination.sortBy;
  pagination.value.page = prop.pagination.page;
  pagination.value.rowsPerPage = prop.pagination.rowsPerPage;

  emits("onRequest", prop);
};

const customSortFunction = (rows, sortBy, descending) => {};
const confirmDelete = (prop) => {
  dialog.value.show(prop.row.id);
};
const remove = (id) => {
  emits("deleteItem", id);
};
const onUpdateField = (field, val, id) => {
  emits("onUpdateField", field, val, id);
};
watch(
  () => props.page,
  (val) => {
    console.log(val);
    //pagination.value.rowsNumber = val;
  },
  { deep: true }
);
</script>
<style scoped>
td.truncate span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  position: relative;
  max-width: calc((100vw - 290px) * 2 / 3);
}

@media (min-width: 1536px) {
  td.truncate span {
  }
}
</style>

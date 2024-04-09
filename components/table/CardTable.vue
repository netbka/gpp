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
      :rows-per-page-options="[12, 24]"
      rows-per-page-label="показывать по"
      :loading-label="'Загружаю'"
      :pagination-label="(start, end, total) => `${start}-${end} из ${total}`"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top>
        <div>
          <h1 class="text-h4">{{ headerTitle }}</h1>
        </div>
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
        <div class="q-pa-xs col-xs-12 col-sm-12 col-lg-4">
          <!-- <slot name="cardComponent" :prop="{ row: props.row, col: props.col }"></slot> -->

          <TableCard
            :data="props.row"
            :cols="props.cols"
            :readOnly="readOnly"
            @onUpdateField="onUpdateField"
            @onEditItem="onEditItem"
            @onDeleteItem="confirmDelete"
          ></TableCard>
        </div>
      </template>
    </q-table>
    <BaseDialogYesNo ref="dialog" @ok="onDeleteItem"></BaseDialogYesNo>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits([
  "onRequest",
  //"onExecuteItem",
  "onEditItem",
  "onCustomAction",
  "onDeleteItem",
  "onUpdateField",
]);
const props = defineProps({
  //propRowActions: { Type: Boolean, default: true },
  //propActions: { Type: Boolean, default: true },
  loading: { Type: Boolean, default: false },
  headerTitle: { Type: String, default: "" },
  rows: { Type: Array, default: [] },
  columns: { Type: Array, default: [] },
  //rowsNumber: { Type: Number, default: 0 },
  //showExecute: { Type: Boolean, default: true },
  //showEdit: { Type: Boolean, default: false },
  //showDelete: { Type: Boolean, default: false },
  //showCustom: { Type: Boolean, default: false },
  readOnly: { Type: Boolean, default: false },
  pagination: { Type: Object, default: {} },
});

const dialog = ref(null);
let filter = ref("");
const tableRef = ref(null);
const pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: 12,
  rowsNumber: 1,
});

onMounted(async () => {
  updatePagination(props.pagination);
});

const updatePagination = (prop) => {
  pagination.value.descending = prop.descending;
  pagination.value.sortBy = prop.sortBy;
  pagination.value.page = prop.page;
  pagination.value.rowsPerPage = prop.rowsPerPage;
  pagination.value.rowsNumber = prop.rowsNumber;
};

const onRequest = (prop) => {
  emits("onRequest", prop);
};
const customSortFunction = (rows, sortBy, descending) => {};

const confirmDelete = (id) => {
  dialog.value.show(id);
};
const onEditItem = (id) => {
  emits("onEditItem", id);
};
const onDeleteItem = (id) => {
  emits("onDeleteItem", id);
};
const onUpdateField = (field, val, id) => {
  emits("onUpdateField", field, val, id);
};
watch(
  () => props.pagination,
  (val) => {
    updatePagination(val);
  },
  { deep: true }
);
</script>
<style></style>

<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-3">
        <TableFilter v-model="filter"></TableFilter>
      </div>

      <div class="col-12 col-lg-9">
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

          <template v-slot:item="prop">
            <div class="q-pa-xs col-xs-12 col-sm-12 col-lg-4">
              <!-- <slot name="cardComponent" :prop="{ row: props.row, col: props.col }"></slot> -->

              <TableCard
                :data="prop.row"
                :cols="prop.cols"
                :readOnly="props.readOnly"
                @onUpdateField="onUpdateField"
                @onEditItem="onEditItem"
                @onDeleteItem="confirmDelete"
              ></TableCard>
            </div>
          </template>
        </q-table>
      </div>

      <BaseDialogYesNo ref="dialog" @ok="onDeleteItem"></BaseDialogYesNo>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emits = defineEmits([
  "onRequest",
  "onEditItem",
  "onCustomAction",
  "onDeleteItem",
  "onUpdateField",
]);
const props = defineProps({
  loading: { Type: Boolean, default: false },
  headerTitle: { Type: String, default: "" },
  rows: { Type: Array, default: [] },
  columns: { Type: Array, default: [] },

  readOnly: { Type: Boolean, default: true },
  pagination: { Type: Object, default: {} },
});

const dialog = ref(null);
const filter = ref("");
const level = ref(0);
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

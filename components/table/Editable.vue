<template>
  <div>
    <q-table
      ref="tableRef"
      class="my-sticky-header-table window-height-100"
      :rows="rows"
      :columns="columns"
      :row-key="(row) => row.id"
      :filter="filter"
      :loading="loading"
      v-model:pagination="pagination"
      binary-state-sort
      flat
      bordered
      no-data-label="Нет данных"
      no-results-label="Ничего не найдено"
      @request="onRequest"
      :rows-per-page-options="[10, 20]"
      rows-per-page-label="Записей на странице"
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
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width v-if="!propActions" />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>

          <q-th class="text-center" auto-width v-if="propActions">
            <q-icon name="bolt" size="1.5em" />
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            <span
              v-html="col.value"
              class=""
              v-if="!col.icon && col.editable === false"
            ></span>
            <slot
              name="editcontrol"
              :prop="{ col: col, row: props.row }"
              v-if="col.editable === true"
            ></slot>

            <q-icon
              size="12px"
              v-if="col.icon"
              :name="publicPrivateIcon(col.value)"
              class="q-mr-sm float-left"
            ></q-icon>
          </q-td>

          <TableBtnColumnAction
            v-if="propRowActions"
            :propRowData="props"
            :propExecuteBtn="executeBtn(showExecute)"
            :propEditBtn="editBtn(showEdit)"
            :propDeleteBtn="deleteBtn(showDelete)"
            :propCustomBtn="customBtn(showCustom)"
            @executeItem="$emit('executeItem', props)"
            @editItem="$emit('editItem', props)"
            @customAction="$emit('customAction', props)"
            @deleteItem="confirmDelete(props)"
          ></TableBtnColumnAction>
        </q-tr>
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
});
const dialog = ref(null);
let filter = ref("");
const tableRef = ref(null);
const paginationSettings = ref({ rowsPerPage: 3 });
const pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 14,
});

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
onMounted(async () => {
  tableRef.value.requestServerInteraction();
});

watch(
  () => props.rowsNumber,
  (val) => {
    pagination.value.rowsNumber = val;
  },
  { deep: true }
);
</script>
<style scoped>
td.truncate span {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
  word-break: break-all; /* allow the text to wrap at arbitrary points within words */
  position: relative;
  max-width: calc((100vw - 290px) * 2 / 3);
}
/* td.truncate span {
  white-space: break-spaces;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow-x: hidden;
  text-overflow: ellipsis;
} */

@media (min-width: 1536px) {
  td.truncate span {
  }
}
</style>

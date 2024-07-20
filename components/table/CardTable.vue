<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-3">
        <TableFilter v-model="filter" :storename="props.cardLink"></TableFilter>
      </div>

      <div class="col-12 col-lg-9">
        <q-table
          grid
          hide-header
          flat
          bordered
          ref="tableRef"
          class=""
          :rows="store.itemArray"
          :columns="columns"
          :row-key="(row) => row.id"
          :filter="filter"
          :loading="loading"
          v-model:pagination="store.pagination"
          binary-state-sort
          no-data-label="$t('components.table.nodata')"
          :no-results-label="$t('components.table.noresults')"
          @request="onRequest"
          :rows-per-page-options="[12, 24, 48, 96]"
          :rows-per-page-label="$t('components.table.rowsperpage')"
          :loading-label="$t('components.table.loading')"
          :pagination-label="
            (start, end, total) =>
              `${start}-${end} ${$t('components.table.from')} ${total}`
          "
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>

          <template v-slot:item="prop">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 card-center">
              <!-- <slot name="cardComponent" :prop="{ row: props.row, col: props.col }"></slot> -->

              <TableCard
                :data="prop.row"
                :readOnly="props.readOnly"
                :cardLink="props.cardLink"
                :cardCaption="props.cardCaption"
                :cardCaptionSecondary="props.cardCaptionSecondary"
                @onUpdateField="onUpdateField"
                @onCloneItem="onCloneItem"
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
  "onCloneItem",
]);
const props = defineProps({
  loading: { Type: Boolean, default: false },
  headerTitle: { Type: String, default: "" },
  rows: { Type: Array, default: [] },
  columns: { Type: Array, default: [] },

  readOnly: { Type: Boolean, default: true },
  //pagination: { Type: Object, default: {} },
  cardLink: { Type: String, default: "" }, //getting the store $id
  cardCaption: { Type: String, default: "" },
  cardCaptionSecondary: { Type: String, default: "" },
});

let store = selectStore(props.cardLink);

const dialog = ref(null);
const filter = ref("");
//const level = ref(0);
const tableRef = ref(null);
// const pagination = ref({
//   sortBy: "name",
//   descending: false,
//   page: 1,
//   rowsPerPage: 12,
//   rowsNumber: 1,
//   level: 0,
// });

//onMounted(async () => {
//updatePagination(props.pagination);
//});

// const updatePagination = (prop) => {
//   pagination.value.descending = prop.descending;
//   pagination.value.sortBy = prop.sortBy;
//   pagination.value.page = prop.page;
//   pagination.value.rowsPerPage = prop.rowsPerPage;
//   pagination.value.rowsNumber = prop.rowsNumber;
// };

// const updateLevel = (level) => {
//   pagination.value.level = level;

// };

//const cache = ref(false);
const onRequest = (prop) => {
  // if (cache.value === true && props.pagination) {
  //   console.log("onRequest", prop);
  //   emits("onRequest", prop);
  //   //if (cache.value === true && props.pagination === undefined)
  // }
  // if (cache.value === false) {
  //   console.log("onRequest", prop);
  //   emits("onRequest", prop);
  //   //if (cache.value === true && props.pagination === undefined)
  // }
  // cache.value = true;
  emits("onRequest", prop);
};
const customSortFunction = (rows, sortBy, descending) => {};

const confirmDelete = (id) => {
  dialog.value.show(id);
};
const onCloneItem = (id) => {
  emits("onCloneItem", id);
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
  () => store.pagination.level,
  (val) => {
    onRequest({ filter: filter.value, pagination: store.pagination });
  },
  { deep: true }
);
</script>
<style scoped>
.card-center {
  text-align: -webkit-center;
}
</style>

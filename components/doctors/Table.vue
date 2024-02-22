<template>
  <div>
    <div class="q-pa-md">
      <q-table
        grid
        flat
        bordered
        :card-container-class="cardContainerClass"
        title="Doctors"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
        v-model:pagination="pagination"
        :rows-per-page-options="rowsPerPageOptions"
      >
        <template v-slot:top>
          <div class="row q-col-gutter-sm full-width">
            <div class="col-3">
              <BaseCitySelect class="q-mr-sm"></BaseCitySelect>
            </div>
            <div class="col-3">
              <BaseMedSpec></BaseMedSpec>
            </div>
            <div class="col-3">
              <BaseMedSubSpec></BaseMedSubSpec>
            </div>
            <div class="col-3">
              <q-input dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-sm col-12">
            <DoctorsUserCard :modelValue="props.row"></DoctorsUserCard>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
const $q = useQuasar();
const props = defineProps({
  rows: {
    type: Array,
  },
});
const { rows } = props;

const rowsPerPageOptions = computed(() => {
  return $q.screen.gt.xs ? ($q.screen.gt.sm ? [3, 6, 9] : [3, 6]) : [3];
});
const cardContainerClass = computed(() => {
  return "grid-masonry";
  // $q.screen.gt.xs
  //   ? "grid-masonry grid-masonry--" + ($q.screen.gt.sm ? "3" : "2")
  //   : null;
});

const columns = ref([
  { name: "firstName", label: "Name", field: "firstName" },
  { name: "lastName", label: "Surname", field: "lastName" },
]);

const getItemsPerPage = () => {
  if ($q.screen.lt.sm) {
    return 3;
  }
  if ($q.screen.lt.md) {
    return 6;
  }
  return 9;
};
const filter = ref("");
const pagination = ref({
  page: 1,
  rowsPerPage: getItemsPerPage(),
});
</script>

<style lang="sass">
.grid-masonry
  flex-direction: column


  &--2
    > div
      &:nth-child(2n + 1)
        order: 1
      &:nth-child(2n)
        order: 2

    &:before
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3
    > div
      &:nth-child(3n + 1)
        order: 1
      &:nth-child(3n + 2)
        order: 2
      &:nth-child(3n)
        order: 3

    &:before,
    &:after
      content: ''
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
</style>

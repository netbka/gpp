<template>
  <div>
    <q-select
      v-model="model"
      label="Select city"
      :options="cities"
      lazy-rules
      clearable
      use-input
      hide-selected
      fill-input
      input-debounce="500"
      options-selected-class="text-deep-orange"
      outlined
      option-value="_id"
      :loading="pending"
      @filter="filterFn"
      option-label="city_name_en"
      @update:model-value="$emit('update', model)"
    >
      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label
              >{{ scope.opt.city_name_en }} / {{ scope.opt.city_name_he }}</q-item-label
            >
            <q-item-label caption>
              {{ scope.opt.region_name }} / {{ scope.opt.PIBA_bureau_name }}</q-item-label
            >
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script lang="ts" setup>
//import { useCityStore } from "~/stores/city";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const { modelValue } = props;
const model = ref(modelValue);
//const store = useCityStore();
//var options = ref([]);

//await store.getCities();

const filterFn = async (val, update, abort) => {
  update(async () => {
    query.value = val;
    // await refresh();
  });
};
//const valueChange = (val) => {};
const query = ref(modelValue);

const uri = "https://data.gov.il/api/3/action/datastore_search";

const { data: cities, pending } = await useAsyncData(
  "cities",
  () =>
    $fetch(uri, {
      params: {
        resource_id: "8f714b6f-c35c-4b40-a0e7-547b675eee0e",
        limit: 10,
        q: query.value,
      },
    }),

  {
    transform: (_cities) => {
      return _cities.result.records.filter((item) => item.city_name_en.trim() !== "");
    },
    watch: [query],
  }
);
</script>

<style></style>

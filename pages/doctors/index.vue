<template>
  <div>
    <!-- <div class="row q-mt-md q-col-gutter-sm">
      <div class="col-4"><BaseCitySelect></BaseCitySelect></div>
      <div class="col-8">
        <BaseMedSpec></BaseMedSpec>
      </div>
    </div> -->
    <DoctorsTable :rows="store.profiles"></DoctorsTable>
  </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from "~/stores/profile";
const store = useProfileStore();
await store.fetchAll();
</script>

<style></style>

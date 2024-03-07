<template>
  <div class="row shadow-1 q-pa-md">
    <q-page-sticky position="top" :offset="[0, 16]">
      <q-fab icon="add" direction="up" color="accent" @click="show()"> </q-fab>
    </q-page-sticky>

    <div class="col-12">
      <PlanForm ref="form"></PlanForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
const form = ref(null);

const show = () => {
  form.value.show();
};
</script>

<style></style>

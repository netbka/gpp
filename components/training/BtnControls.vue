<template>
  <div class="fit row shadow-1 q-py-sm no-wrap ellipsis justify-between">
    <div class="col-auto self-center">
      <q-btn
        icon="arrow_back_ios"
        size="sm"
        class="q-mr-xs padding-2"
        outline
        @click="back()"
      ></q-btn>
    </div>
    <div class="col-auto">
      <q-btn
        outline
        color="primary"
        class="q-mr-xs"
        icon="30fps_select"
        @click="$emit('setDuration', 15)"
        size="sm"
      />
      <q-btn
        icon="60fps_select"
        outline
        color="primary"
        class="q-mr-xs"
        @click="$emit('setDuration', 60)"
        size="sm"
      />
      <q-btn
        outline
        color="primary"
        class="q-mr-xs"
        label="90"
        @click="$emit('setDuration', 90)"
        size="sm"
      />
    </div>
    <div class="col-auto">
      <q-btn
        icon="outlined_flag"
        outline
        @click="$emit('start')"
        class="q-mr-xs"
        color="secondary"
        size="sm"
        >Go</q-btn
      >
      <q-btn
        icon="library_add"
        outline
        @click="$emit('addGroup')"
        class="q-mr-xs"
        color="green-7"
        size="sm"
      ></q-btn>
      <q-btn
        icon="save"
        outline
        @click="$emit('onSaveTraining')"
        color="light-blue-9"
        size="sm"
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
const back = async () => {
  await navigateTo({ path: "/training" });
};
</script>

<style></style>

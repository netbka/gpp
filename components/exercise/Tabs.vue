<template>
  <div class="">
    <q-tabs
      v-model="tab"
      dense
      class="text-grey bg-white"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="exercise" label="Занятие" />
      <q-tab name="plan" label="Планы" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="tab" animated class="q-pa-none">
      <q-tab-panel name="exercise">
        <ExerciseSetting ref="exercise"></ExerciseSetting>
      </q-tab-panel>

      <q-tab-panel name="plan">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script lang="ts" setup>
const tab = ref("exercise");
</script>

<style></style>

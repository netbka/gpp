<template>
  <q-page-sticky
    position="top"
    :offset="[0, 4]"
    style="z-index: 999"
    v-if="!props.readOnly"
  >
    <q-fab icon="add" color="accent" @click="$emit('newItem')" label="">
      <template v-slot:icon>
        <q-icon name="add" />
      </template>

      <template v-slot:active-icon>
        <q-icon name="add" />
      </template>
    </q-fab>
  </q-page-sticky>
</template>

<script lang="ts" setup>
const props = defineProps({
  readOnly: { Type: Boolean, default: false },
});
</script>

<style></style>

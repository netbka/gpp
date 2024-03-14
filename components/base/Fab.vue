<template>
  <q-page-sticky position="bottom" :offset="[0, 0]" style="z-index: 9999">
      <q-fab icon="add" color="accent" @click="$emit('newItem')"> </q-fab>
    </q-page-sticky>
</template>

<script lang="ts" setup>

</script>

<style>

</style>
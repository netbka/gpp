<template>
  <div class="shadow-1">

    <TrainingTable @edit="show"></TrainingTable>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: true });


const store = useTrainingStore();

</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

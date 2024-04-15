<template>
  <ContentCard :data="store.currentItem"></ContentCard>
</template>
<script lang="ts" setup>
definePageMeta({ auth: false });
const route = useRoute();
const { id } = route.params;

const store = useExerciseTemplateStore();
await store.getById(parseSlugId(id));
onBeforeMount(async () => {});
</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

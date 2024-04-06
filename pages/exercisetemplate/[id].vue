<template>
  <ContentCard :data="store.currentItem"></ContentCard>
</template>
<script lang="ts" setup>
definePageMeta({ auth: false });
const route = useRoute();
const { id } = route.params;

const store = useExerciseTemplateStore();
onBeforeMount(async () => {
  await store.getById(parseSlugId(id));
});
</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

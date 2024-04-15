<template>
  <ContentCard :data="data"></ContentCard>
</template>
<script lang="ts" setup>
definePageMeta({ auth: false });
const route = useRoute();
const { id } = route.params;

const store = useExerciseTemplateStore();
const { data, pending, error, refresh, execute } = await getItemById(
  store,
  parseSlugId(id)
);
//await store.getById(parseSlugId(id));
</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

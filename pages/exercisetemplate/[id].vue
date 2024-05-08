<template>
  <div>
    <ContentCard :data="data" :loading="pending" v-if="data"></ContentCard>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ auth: false });
const route = useRoute();
const { id } = route.params;

const store = useExerciseTemplateStore();
const crud = useSSRCrud(store);
const { getImageById } = useImageManager(store);
const { data, pending, error, refresh } = await crud.getItemById(parseSlugId(id));

useServerSeoMeta({
  titleTemplate: data.value.name + " | %s",
  description: data.value.description,
  image: getImageFromStorage(store.$id, data.value.id),
  ogTitle: data.value.name + " | %s",
  ogDescription: data.value.description,

  ogImage: getImageFromStorage(store.$id, data.value.id),
  twitterCard: getImageFromStorage(store.$id, data.value.id),
});
</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

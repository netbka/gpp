<template>
  <div>
    <ContentPage
      :data="data.entity"
      :loading="pending"
      v-if="data"
      :link="store.$id"
    ></ContentPage>
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

useSeoMeta({
  titleTemplate: data.value.entity.name + " | ОФП для бегунов",
  description: "Занимайся онлайн. " + data.value.entity.description,
  ogTitle: data.value.entity.name + " | ОФП для бегунов",
  ogDescription: "Занимайся онлайн. " + data.value.entity.description,
});
</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

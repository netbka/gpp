<template>
  <div>
    <ContentPage
      :data="data"
      :loading="pending"
      v-if="data"
      :link="store.$id"
      :muscleArr="data.exerciseTemplateMuscle"
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
  titleTemplate: data.value.name + " | ОФП для бегунов",
  description: "Занимайся онлайн. " + data.value.description,
  ogTitle: data.value.name + " | ОФП для бегунов",
  ogDescription: "Занимайся онлайн. " + data.value.description,
});
</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

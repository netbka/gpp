<template>
  <div>
    <ContentTrainingPage
      :data="data"
      :loading="pending"
      v-if="data"
      :link="store.$id"
      :muscleArr="data.exerciseTemplateMuscle"
    ></ContentTrainingPage>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
const route = useRoute();
const { id } = route.params;
const store = trainingStore();

const crud = useSSRCrud(store);
const { data, pending, error, refresh } = await crud.getItemById(parseSlugId(id));
//console.log(data);
useSeoMeta({
  titleTemplate: data.value.name + " | ОФП для бегунов",
  description: "Занимайся онлайн. " + data.value.description,
  ogTitle: data.value.name + " | ОФП для бегунов",
  ogDescription: "Занимайся онлайн. " + data.value.description,
});
</script>

<style></style>

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
//const { data, pending, error, refresh } = await getItemById(store, parseSlugId(id));

const crud = useBasicCrud(store);
const { data, pending, error, refresh } = await crud.getItemById(parseSlugId(id));

// if (error.value) {
//   throw createError({
//     statusCode: 404,
//     message: "Нет такого упражнения", //"Этого занятия нет",
//   });
// }
</script>

<style scoped>
.totop {
  z-index: 999;
}
</style>

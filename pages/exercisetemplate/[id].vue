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
const { data, pending, error, refresh, execute } = await getItemById(
  store,
  parseSlugId(id)
);
console.log(error.value);
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

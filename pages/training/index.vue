<template>
  <div>
    <!-- <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <ErrorBoundary :error="error" />
      </template> -->
    <ContentHero
      :header="'Тренировки ОФП для бега'"
      :subHeading="'Подборка лучших упражнений на скорость и выносливость'"
      :subHeading2="'Занимайся ОФП - это просто'"
    ></ContentHero>

    <TrainingTable @onEditItem="showForm"></TrainingTable>

    <TrainingForm ref="form"></TrainingForm>

    <BaseFab @newItem="showForm" :readOnly="true"></BaseFab>

    <!-- </NuxtErrorBoundary> -->
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: false,
});
useSeoMeta({
  titleTemplate:
    "Программа тренировок для улучшения беговых результатов | ОФП для бегунов",
  description:
    "Сборник ОФП тренировок для бегунов. Советы и практические примеры выполнения.",
  ogTitle: "Программа ОФП тренировок | ОФП для бегунов",
  ogDescription:
    "Сборник ОФП тренировок для бегунов. Советы и практические примеры выполнения.",
});

const form = ref(null);

const { isLoggedIn } = useAuthUser();

const showForm = (id) => {
  form.value.show(id);
};
</script>

<style scoped></style>

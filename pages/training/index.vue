<template>
  <div>
    <!-- <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <ErrorBoundary :error="error" />
      </template> -->
    <ContentHero
      :header="$t('training.header')"
      :subHeading="$t('training.subheading')"
      :subHeading2="$t('training.subheading2')"
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

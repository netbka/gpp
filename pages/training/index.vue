<template>
  <div>
    <Head>
      <Title>Подборка тренировок | ОФП для бегунов</Title>
    </Head>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <ErrorBoundary :error="error" />
      </template>
      <ContentHero
        :header="'Подборка тренировок'"
        :subHeading="'Не трать время на планирование '"
        :subHeading2="' Все готово от Просто ОФП'"
      ></ContentHero>

      <TrainingTable @onEditItem="showForm"></TrainingTable>

      <TrainingForm ref="form"></TrainingForm>
      <BaseFab @newItem="showForm" :readOnly="!isLoggedIn()"></BaseFab>
    </NuxtErrorBoundary>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: false,
});
useSeoMeta({
  titleTemplate: "Подборка ОФП тренировок | ОФП для бегунов",
  description:
    "Сборник ОФП тренировок для бегунов. Советы и практические примеры выполнения.",
  ogTitle: "Подборка ОФП тренировок | ОФП для бегунов",
  ogDescription:
    "Сборник ОФП тренировок для бегунов. Советы и практические примеры выполнения.",
});

const form = ref(null);

const { isAdmin, isLoggedIn } = useAuthUser();

const showForm = (id) => {
  form.value.show(id);
};
</script>

<style scoped></style>

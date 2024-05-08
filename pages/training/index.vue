<template>
  <div>
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
definePageMeta({ auth: false });
useServerSeoMeta({
  titleTemplate: "Подборка тренировок %s",
  description: "Не трать время на планирование. Все готово от Просто ОФП",
  image: "https://www.ofp.mamrukov.com/main_page_hero.webp",
  ogTitle: "Подборка тренировок %s",
  ogDescription: "Не трать время на планирование. Все готово от Просто ОФП",
  ogImage: "https://www.ofp.mamrukov.com/main_page_hero.webp",
  twitterCard: "https://www.ofp.mamrukov.com/main_page_hero.png",
});
const form = ref(null);

const { isAdmin, isLoggedIn } = useAuthUser();

const showForm = (id) => {
  form.value.show(id);
};
</script>

<style scoped></style>

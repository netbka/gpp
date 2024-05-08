<template>
  <div>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <ErrorBoundary :error="error" />
      </template>
      <ContentHero
        :header="'Подборка упражнений'"
        :subHeading="'Популярные упражнения от Просто ОФП'"
      ></ContentHero>

      <ExercisetemplateTable
        @onEditItem="showForm"
        :readOnly="!isAdmin()"
      ></ExercisetemplateTable>

      <ExercisetemplateForm ref="form"></ExercisetemplateForm>
      <BaseFab @newItem="showForm" :readOnly="!isAdmin()"></BaseFab>
    </NuxtErrorBoundary>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ auth: false });
useServerSeoMeta({
  titleTemplate: "Подборка упражнений %s",
  description: "Сборник ОФП для бегунов. Советы и практические примеры выполнения.",
  image: "https://www.ofp.mamrukov.com/main_page_hero.webp",
  ogTitle: "Подборка упражнений %s",
  ogDescription: "Сборник ОФП для бегунов. Советы и практические примеры выполнения.",
  ogImage: "https://www.ofp.mamrukov.com/main_page_hero.webp",
  twitterCard: "https://www.ofp.mamrukov.com/main_page_hero.png",
});
const form = ref(null);

const { isAdmin, currentUserId } = useAuthUser();

const showForm = (id) => {
  form.value.show(id);
};
</script>

<style scoped></style>

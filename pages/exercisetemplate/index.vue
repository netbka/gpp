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
useSeoMeta({
  titleTemplate:
    "Упражнения ОФП для повышения скорости, выносливости и минимизации травм | ОФП для бегунов",
  description: "Сборник ОФП для бегунов. Советы и практические примеры выполнения.",
  ogTitle:
    "Упражнения ОФП для повышения скорости, выносливости и минимизации травм | ОФП для бегунов",
  ogDescription: "Сборник ОФП для бегунов. Советы и практические примеры выполнения.",
});

const form = ref(null);

const { isAdmin, currentUserId } = useAuthUser();

const showForm = (id) => {
  form.value.show(id);
};
</script>

<style scoped></style>

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

      <TrainingTable @onEditItem="showForm" :readOnly="!isAdmin()"></TrainingTable>

      <TrainingForm ref="form"></TrainingForm>
      <BaseFab @newItem="showForm" :readOnly="!isAdmin()"></BaseFab>
    </NuxtErrorBoundary>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
const form = ref(null);

const { isAdmin } = useAuthUser();

const showForm = (id) => {
  form.value.show(id);
};
</script>

<style scoped></style>

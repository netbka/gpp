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
const form = ref(null);

const { isAdmin, isLoggedIn } = useAuthUser();

const showForm = (id) => {
  form.value.show(id);
};
</script>

<style scoped></style>

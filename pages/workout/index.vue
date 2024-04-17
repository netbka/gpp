<template>
  <div>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <ErrorBoundary :error="error" />
      </template>
      <ContentHero
        :header="'Подборка тренировок'"
        :subHeader="'Не трать время на планирование. Все готово от Просто ОФП'"
      ></ContentHero>
      <WorkoutTable></WorkoutTable>
    </NuxtErrorBoundary>
    <!-- <ErrorBoundary>
      
    </ErrorBoundary> -->
  </div>
</template>

<script setup></script>

<style scoped></style>

<template>
  <div>
    <!-- <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <ErrorBoundary :error="error" />
      </template> -->
    <ContentHero
      :header="'Подборка упражнений'"
      :subHeader="'Популярные упражнения от Просто ОФП'"
    ></ContentHero>

    <ExercisetemplateTable
      @onEditItem="showForm"
      :readOnly="!isAdmin()"
    ></ExercisetemplateTable>

    <ExercisetemplateForm ref="form"></ExercisetemplateForm>
    <BaseFab @newItem="showForm" :readOnly="!isAdmin()"></BaseFab>
    <!-- </NuxtErrorBoundary> -->
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

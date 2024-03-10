<template>
  <ClientOnly>
    <div class="row shadow-1 q-pa-md">
      <div class="col-12">
        {{ item.name }} - {{ item.id }}
        <q-btn label="+ Группа" outline @click="addGroup()"></q-btn>
        <q-btn label="Сохранить" outline @click="Save()"></q-btn>
      </div>
    </div>
    <div class="row shadow-1 q-pa-md">
      <div class="col-12"><TrainingConstructor></TrainingConstructor></div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const route = useRoute();
const { id } = route.params;

const store = trainingStore();
const storeExerciseGroup = exerciseGroupStore();

await store.getById(parseSlugId(id));
const item = computed(() => store.getCurrentItem);

const addGroup = async () => {
  storeExerciseGroup.resetCurrentItem(
    store.currentItem.id,
    store.currentItem.exerciseGroup.length
  );
  const group = await storeExerciseGroup.create();

  updateArray(group, store.currentItem.exerciseGroup);
};

const storeExerciseTemplate = exerciseTemplateStore();
await storeExerciseTemplate.fetchMyAndPublic();

const Save = () => {
  store.updateTrainingPlan();
};
</script>

<style></style>

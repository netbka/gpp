<template>
  <div class="q-pa-sm">
    <div class="row shadow-1 q-py-sm no-wrap ellipsis q-px-xs">
      <div class="col-grow self-center">
        <div class="text-subtitle1 text-bold">
          План тренировки
          <InputText
            v-model="store.currentItem.name"
            @updatedb="updateItem('name', store.currentItem.name, store.currentItem.id)"
          ></InputText>
        </div>
        <q-item-label caption>Продолжительность: {{ duration }}</q-item-label>
      </div>
    </div>
    <div class="row">
      <div class="col-12"><TrainingConstructor></TrainingConstructor></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
const route = useRoute();
const { id } = route.params;
const store = trainingStore();
const crud = useClientCrud(store);

//const { data, pending, error, refresh } = await crud.getItemById(parseSlugId(id));
await crud.getById(parseSlugId(id));

const updateItem = async (field, value, id) => {
  await crud.updateItemField(field, value, id);
};

const storeExerciseTemplate = exerciseTemplateStore();
const crudExerciseTemplate = useSSRCrud(storeExerciseTemplate);
await crudExerciseTemplate.fetchAll("myandpublic");

const duration = ref("");
watch(
  () => store.getDuration,
  (val) => {
    duration.value = durationToText(val);
  },
  { deep: true },
  { immediate: true }
);
</script>

<style></style>

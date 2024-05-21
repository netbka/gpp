<template>
  <ClientOnly>
    <div class="q-pa-sm">
      <div class="row shadow-1 q-py-sm no-wrap ellipsis q-px-xs">
        <div class="col-grow self-center">
          <div class="text-subtitle1 text-bold">
            <InputText
              :readOnly="!canEditDelete"
              v-model="store.currentItem.name"
              @updatedb="
                updateItemField('name', store.currentItem.name, store.currentItem.id)
              "
            ></InputText>
          </div>
          <q-item-label caption>Продолжительность: {{ duration }}</q-item-label>
        </div>
      </div>
      <div class="row">
        <div class="col-12"><TrainingConstructor></TrainingConstructor></div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
definePageMeta({ auth: false });
const route = useRoute();
const { id } = route.params;
const store = trainingStore();
const crud = useClientCrud(store);
const crudSSR = useSSRCrud(store);
const { data, pending, error, refresh } = await crudSSR.getItemById(parseSlugId(id));

useSeoMeta({
  titleTemplate: data.value.name + " | ОФП для бегунов",
  description: "Занимайся онлайн. " + data.value.description,
  ogTitle: data.value.name + " | ОФП для бегунов",
  ogDescription: "Занимайся онлайн. " + data.value.description,
});

const updateItemField = async (field, value, id) => {
  await crud.updateItemField(field, value, id, null, false);
};

const { currentUserId } = useAuthUser();

const storeExerciseTemplate = exerciseTemplateStore();
const crudExerciseTemplate = useSSRCrud(storeExerciseTemplate);
await crudExerciseTemplate.fetchAll("myandpublic");

const { canEditDelete } = useCanEditDelete(store);

const duration = ref("");
watch(
  () => store.getDuration,
  (val) => {
    duration.value = durationToText(val);
  },

  { immediate: true }
);
</script>

<style></style>

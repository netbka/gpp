<template>
  <div class="q-pa-sm">
    <ClientOnly>
      <div class="row shadow-1 q-py-sm no-wrap ellipsis">
        <div class="col-grow self-center">
          <div class="text-subtitle1 text-bold">
            План тренировки
            <InputText
              v-model="store.currentItem.name"
              @updatedb="updateItem('name', store.currentItem.name, store.currentItem.id)"
            ></InputText>
          </div>
          <q-item-label caption
            >Продолжительность: {{ numToMin(duration) }} мин.
            {{ numToSec(duration) }} сек.</q-item-label
          >
        </div>
      </div>
      <div class="row">
        <div class="col-12"><TrainingConstructor></TrainingConstructor></div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: true });
const route = useRoute();
const { id } = route.params;

const store = trainingStore();
//const storeExerciseGroup = exerciseGroupStore();

await store.getById(parseSlugId(id));

//const item = computed(() => store.getCurrentItem);

const updateItem = async (field, value, id) => {
  await store.updateItemField(field, value, id);
};

const storeExerciseTemplate = exerciseTemplateStore();
await storeExerciseTemplate.fetchAll();

const duration = computed(() => calculateDuration(store.currentItem.exerciseGroup));
</script>

<style></style>

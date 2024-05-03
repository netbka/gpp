<template>
  <div class="q-pa-sm">
    <ClientOnly>
      <div class="row shadow-1 q-py-sm no-wrap ellipsis q-px-xs">
        <div class="col-grow self-center">
          <div class="text-subtitle1 text-bold">
            План тренировки
            <InputText v-model="store.currentItem.name" :readOnly="true"></InputText>
          </div>
          <q-item-label caption
            >Продолжительность: {{ numToMin(duration) }} мин.
            {{ numToSec(duration) }} сек.</q-item-label
          >
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <TrainingConstructor :readOnly="true"></TrainingConstructor>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { id } = route.params;

const store = trainingStore();

await store.getById(parseSlugId(id));

const storeExerciseTemplate = exerciseTemplateStore();
await storeExerciseTemplate.fetchAll();

const duration = computed(() => calculateDuration(store.currentItem.exerciseGroup));
</script>

<style></style>

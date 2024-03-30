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
        <q-item-label caption
          >Продолжительность: {{ duration.min }} мин.
          {{ duration.sec }} сек.</q-item-label
        >
      </div>
    </div>
    <div class="row">
      <ClientOnly>
        <div class="col-12"><TrainingConstructor></TrainingConstructor></div>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ auth: true });
const route = useRoute();
const { id } = route.params;

const store = trainingStore();
//const storeExerciseGroup = exerciseGroupStore();
onBeforeMount(async () => {
  await store.getById(parseSlugId(id));
});

//const item = computed(() => store.getCurrentItem);

const updateItem = async (field, value, id) => {
  await store.updateItemField(field, value, id);
};

const storeExerciseTemplate = exerciseTemplateStore();
await storeExerciseTemplate.fetchAll();

//const duration = computed(() => calculateDuration(store.currentItem.exerciseGroup));
const duration = ref({ min: 0, sec: 0 });
watch(
  () => store.getDuration,
  (val) => {
    duration.value.min = numToMin(val);
    duration.value.sec = numToSec(val);
  },
  { deep: true }
);
</script>

<style></style>

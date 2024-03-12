<template>
  <q-scroll-area class="scroll-height" :bar-style="barStyle()">
    <TrainingBtnControls
      @setDuration="setDuration"
      @addGroup="addGroup"
      @start="start"
    ></TrainingBtnControls>
    <ClientOnly>
      <div class="row shadow-1 q-py-sm no-wrap ellipsis">
        <div class="col-grow self-center">
          <div class="text-subtitle1 text-bold">
            План тренировки
            <BaseTextInput
              v-model="store.currentItem.name"
              @updatedb="updateItem('name', store.currentItem.name, store.currentItem.id)"
            ></BaseTextInput>
          </div>
          <q-item-label caption
            >Продолжительность: {{ numToMin(duration) }} мин.
            {{ numToSec(duration) }} сек.</q-item-label
          >
        </div>
      </div>
      <div class="row shadow-1 q-xs-md">
        <div class="col-12"><TrainingConstructor></TrainingConstructor></div>
      </div>
    </ClientOnly>
  </q-scroll-area>
</template>

<script lang="ts" setup>
const route = useRoute();
const { id } = route.params;

const store = trainingStore();
const storeExerciseGroup = exerciseGroupStore();

await store.getById(parseSlugId(id));
const item = computed(() => store.getCurrentItem);

const updateItem = async (field, value, id) => {
  await store.updateItemField(field, value, id);
};

const addGroup = async () => {
  storeExerciseGroup.resetCurrentItem(
    store.currentItem.id,
    store.currentItem.exerciseGroup.length
  );
  const group = await storeExerciseGroup.create();

  updateArray(group, store.currentItem.exerciseGroup);
};

const storeExerciseTemplate = exerciseTemplateStore();
await storeExerciseTemplate.fetchAll();
const save = () => {
  store.updateTrainingPlan();
};
const duration = computed(() => calculateDuration(store.currentItem.exerciseGroup));
const setDuration = (val) => {
  store.setDuration(val);
};
const start = (val) => {};
</script>

<style></style>

<template>
  <q-scroll-area class="scroll-height" :bar-style="barStyle()">
    <!-- <q-scroll-area :style="{ height: 'calc(100vh - 100px)' }" :bar-style="barStyle()"> -->
    <ClientOnly>
      <div class="row shadow-1 q-pa-sm no-wrap ellipsis">
        <div class="col-grow self-center">
          <BaseTextInput
            v-model="item.name"
            @updatedb="updateItem('name', item.name, item.id)"
          ></BaseTextInput>
        </div>
        <div class="col-auto">
          <q-btn
            icon="add_chart"
            outline
            @click="addGroup()"
            class="q-mr-xs"
            color="green-7"
            size="sm"
          ></q-btn>
          <q-btn
            icon="save"
            outline
            @click="Save()"
            color="light-blue-9"
            size="sm"
          ></q-btn>
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
await storeExerciseTemplate.fetchMyAndPublic();

const Save = () => {
  store.updateTrainingPlan();
};
// const $q = useQuasar();
// let height = $q.screen.gt.xs
//   ? { height: "calc(100vh)-40px" }
//   : { height: "calc(100vh - 100px)" };
</script>

<style></style>

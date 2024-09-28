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
          <div class="row">
            <div class="col-grow self-center">
              <q-item-label caption
                >{{ $t("workout.duration") }}: {{ durationMin }}
                {{ $t("workout.min") }}
                {{ durationSec }}
                {{ $t("workout.sec") }}
              </q-item-label>
            </div>
            <div class="col-auto align-right q-mr-md">
              <q-toggle
                :label="toggleText ? $t('workout.toggleoff') : $t('workout.toggleon')"
                color="secondary"
                keep-color
                class="float-right inline"
                v-model="toggleText"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <TrainingConstructor v-show="toggleText"></TrainingConstructor>
          <ContentDetailedTraining
            :data="store.currentItem"
            v-show="!toggleText"
          ></ContentDetailedTraining>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
const toggleText = ref(true);
definePageMeta({ auth: false });
const route = useRoute();
const { id } = route.params;
const store = trainingStore();
const crud = useClientCrud(store);
const crudSSR = useSSRCrud(store);
const { data, pending, error, refresh } = await crudSSR.getItemById(parseSlugId(id));

useSeoMeta({
  titleTemplate: data.value.entity.name + " | ОФП для бегунов",
  description: "Занимайся онлайн. " + data.value.entity.description,
  ogTitle: data.value.entity.name + " | ОФП для бегунов",
  ogDescription: "Занимайся онлайн. " + data.value.entity.description,
});

const updateItemField = async (field, value, id) => {
  await crud.updateItemField(field, value, id, null, false);
};

const { currentUserId } = useAuthUser();

const storeExerciseTemplate = exerciseTemplateStore();
const crudExerciseTemplate = useSSRCrud(storeExerciseTemplate);
await crudExerciseTemplate.fetchAll("public");

const { canEditDelete } = useCanEditDelete(store);

const durationMin = ref("");
const durationSec = ref("");
watch(
  () => store.getDuration,
  (val) => {
    durationMin.value = numToMinText(val);
    durationSec.value = numToSecText(val);
  },

  { immediate: true }
);
</script>

<style></style>

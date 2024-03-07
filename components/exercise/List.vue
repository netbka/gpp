<template>
  <div>
    <q-scroll-area :style="{ height: 'calc(100vh - 150px)' }" :bar-style="barStyle">
      <q-list bordered class="rounded-borders full-height max-height">
        <div v-for="(muscleGroup, muscleGroupName) in groupedData" :key="muscleGroupName">
          <q-item-label
            header
            class="text-subtitle1 text-weight-bold text-black text-uppercase q-pa-md"
            >{{ muscleGroupName }}</q-item-label
          >
          <div v-for="exercise in muscleGroup" :key="exercise.id">
            <q-item>
              <q-item-section top>
                <q-item-label lines="1">
                  <BaseTextInput
                    v-model="exercise.name"
                    @updatedb="updateItem('name', exercise.name, exercise.id)"
                  ></BaseTextInput>
                  <span class="text-grey-8 q-ml-sm self-center">
                    {{ exercise.duration }} сек.</span
                  >
                </q-item-label>

                <q-item-label lines="1" class="q-mt-xs text-caption">
                  <span class="">
                    <q-icon :name="publicPrivateIcon(exercise.public)" size="xs"></q-icon>
                    {{
                      exercise.public
                        ? "Публичное. Могут добавить все"
                        : "Частное. Вижу только я."
                    }}</span
                  >
                </q-item-label>
              </q-item-section>
              <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="edit"
                    @click="edit(exercise)"
                  />
                  <q-btn
                    class="gt-xs"
                    size="12px"
                    flat
                    dense
                    round
                    icon="delete"
                    @click="confirmDelete(exercise.id)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-list>
    </q-scroll-area>
    <BaseYesNoDialog ref="dialog" @ok="remove"></BaseYesNoDialog>
  </div>
</template>

<script lang="ts" setup>
const dialog = ref(null);
import { useExerciseStore } from "~/stores/exercise";
const store = useExerciseStore();
let groupedData = computed(() => store.getGroupedArray());
//console.log(groupedData);
await store.fetchAll();
const confirmDelete = (id) => {
  dialog.value.show(id);
};
const edit = (val) => {
  store.currentItem = val;
};

const remove = (id) => {
  store.deleteItem(id);
};

const updateItem = async (field, val, id) => {
  await store.updateItemField(field, val, id);
};

const publicPrivateIcon = (val) => {
  return val ? "public" : "lock";
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "rgb(233 131 216 / 87%)",
  width: "9px",
  opacity: 0.2,
};
</script>

<style scoped>
/* .max-height {
  max-height: 100px;
} */
/* @update:modelValue="
                      (newValue) => updateItem('name', newValue, exercise.id)
                    " */
</style>

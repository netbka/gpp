<template>
  <div>
    <q-list bordered class="rounded-borders full-height">
      <div v-for="(muscleGroup, muscleGroupName) in groupedData" :key="muscleGroupName">
        <q-item-label header class="q-pa-md">{{ muscleGroupName }}</q-item-label>
        <div v-for="exercise in muscleGroup" :key="exercise.id">
          <q-item>
            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{ exercise.name }}</span>
                <span class="text-grey-8 q-ml-sm"> {{ exercise.duration }} сек.</span>
              </q-item-label>

              <q-item-label lines="1" class="q-mt-xs text-caption text-uppercase">
                <span class="">{{
                  exercise.public
                    ? "Публичное. Могут добавить все"
                    : "Частное. Вижу только я."
                }}</span>
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
    <BaseYesNoDialog ref="dialog" @ok="remove"></BaseYesNoDialog>
  </div>
</template>

<script lang="ts" setup>
const dialog = ref(null);
import { useExerciseStore } from "~/stores/exercise";
const store = useExerciseStore();
let groupedData = computed(() => store.getGroupedArray());

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
</script>

<style></style>

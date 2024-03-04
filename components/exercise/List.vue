<template>
  <q-list bordered class="rounded-borders full-height">
    <div v-for="(muscleGroup, muscleGroupName) in groupedData" :key="muscleGroupName">
      <q-item-label header class="q-pa-md">{{ muscleGroupName }}</q-item-label>
      <div v-for="exercise in muscleGroup" :key="exercise.id">
        <q-item>
          <!-- <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-medium">{{ exercise.name }}</span>
                <span class="text-grey-8"> - GitHub repository</span>
              </q-item-label>

              <q-item-label
                lines="1"
                class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
              >
                <span class="cursor-pointer">Open in GitHub</span>
              </q-item-label>
            </q-item-section> -->

          <!-- <q-item-section top side>
              <div class="text-grey-8 q-gutter-xs">
                <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
                <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
              </div>
            </q-item-section> -->
        </q-item>
      </div>
    </div>
  </q-list>
</template>

<script lang="ts" setup>
import { useExerciseStore } from "~/stores/exercise";
const store = useExerciseStore();
let groupedData = ref([]);

watch(
  () => store.itemArray,
  (data) => {
    try {
      groupedData = data.reduce((groups, item) => {
        const group = groups[item.muscle.name] || [];
        group.push(item);
        groups[item.muscle.name] = group;
        return groups;
      }, {});
      console.log(groupedData);
    } catch (error) {
      console.log(error);
    }
  },
  { deep: true },
  { immediate: true }
);
</script>

<style></style>

<template>
  <q-card class="full-width bg-accent text-white m-t-20">
    <q-card-section>
      <div class="text-subtitle1">Schedule meeting</div>

      <div class="text-subtitle2">
        with Dr
        <ClientOnly>
          <q-badge outline color="blue-1">
            {{ store.profile.firstName }} {{ store.profile.lastName }}
          </q-badge>
        </ClientOnly>
      </div>
    </q-card-section>
    <q-separator dark />
    <q-card-section>
      <div class="text-left">Start: {{ formatDate(model.start) }}</div>
      <div class="text-left">End: {{ formatDate(model.end) }}</div>
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-btn class="full-width" color="primary">Schedule</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { useProfileStore } from "~/stores/profile";
const store = useProfileStore();
const route = useRoute();
const { user_id } = route.params;

store.fetchItem(user_id);

import { date } from "quasar";
import type { Event } from "~/types/types";
const props = defineProps<{
  event: Event;
}>();

const model = computed(() => props.event);

const formatDate = (val) => {
  return val !== null ? date.formatDate(val, "HH:mm") : "";
  //return date.formatDate(val, "HH:mm");
  //return _.formatDate(val, 'YYYY-MM-DD');
};
</script>

<style></style>

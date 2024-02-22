<template>
  <q-card class="full-width bg-accent text-white m-t-20">
    <q-card-section>
      <div class="text-h6">Schedule meeting</div>

      <div class="text-subtitle2">with Dr</div>
    </q-card-section>
    <q-separator dark />
    <q-card-section>
      <div id="external-events" ref="extEvent">
        <div class="fc-event" data-event='{ "title": "my event", "duration": "02:00" }'>
          drag me
        </div>
      </div>
    </q-card-section>

    <q-separator dark />

    <q-card-actions>
      <q-btn flat class="full-width">Action 1</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { Draggable } from "@fullcalendar/interaction";
import { date } from "quasar";

const extEvent = ref(null);
let sdate = ref("");
sdate = date.formatDate(new Date(), "YYYY-MM-DD");
const existingEvents = [
  {
    id: 1,
    title: "Event 1",
    start: date.addToDate(sdate, { hours: 10 }),
    end: date.addToDate(sdate, { hours: 11 }),
  },
  {
    id: 2,
    title: "Event 2",
    start: date.addToDate(sdate, { hours: 14 }),
    end: date.addToDate(sdate, { hours: 15 }),
  },
];
const events = reactive(existingEvents);
let drag;
onMounted(async () => {
  drag = new Draggable(extEvent.value, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      return {
        title: eventEl.innerText,
      };
    },
  });
});
</script>

<style></style>

<template>
  <div class="row q-col-gutter-lg wrap justify-center content-center">
    <div class="col-10">
      <DoctorsCalendar @scheduleEvent="scheduleEvent"></DoctorsCalendar>
    </div>
    <div class="col-2 text-center">
      <DoctorsCalendarMeeting :event="event"></DoctorsCalendarMeeting>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Event } from "~/types/types";
let event = ref(null);
const scheduleEvent = (arg) => {
  event.value = arg;
};
</script>

<style></style>

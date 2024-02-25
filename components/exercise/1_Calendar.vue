<template>
  <div>
    <FullCalendar :options="calendarOptions" ref="fCalendar">
      <template v-slot:eventContent="arg">
        <div class="text-bold">
          <b>{{ arg.timeText }}</b>
        </div>
        <i>{{ arg.event.title }}</i>

        <div class="absolute-right">
          <q-btn
            size="sm"
            color="accent"
            label="Schedule"
            class=""
            @click="$emit('scheduleEvent', arg.event)"
          />
        </div>
      </template>
    </FullCalendar>
  </div>
</template>

<script lang="ts" setup>
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
const { user_id } = useRoute().params;
//import { date } from "quasar";
// let sdate = ref("");
// sdate = date.formatDate(new Date(), "YYYY-MM-DD");

const fCalendar = ref(null);
//let calendarApi;
//let events = reactive([]);
// const eventSources = reactive({
//   events: () => weekEvents(new Date()),
// });
//var eventSources = reactive([]);

// {
//   events: () => weekEvents(new Date()), // Replace with your logic to fetch or calculate events
// };
//ref([]);
//events = weekEvents();
//const profile = computed(() => user.value?.user_metadata.avatar_url);

let today = ref("");
today.value = new Date();

onMounted(async () => {
  // calendarApi = fCalendar.value.getApi();
  // eventSources.value = weekEvents(new Date());
});

let calendarOptions = {
  plugins: [interactionPlugin, timeGridPlugin],
  weekends: false,
  initialView: "timeGridWeek",
  nowIndicator: true,
  editable: true,
  droppable: true,

  // initialEvents: [
  //   {
  //     title: "nice event 1",
  //     start: new Date(),
  //   },
  //   {
  //     title: "nice event 2",
  //     start: sdate1,
  //     end: edate1,
  //     custom: "https://sfu.mirotalk.com/join/33096BasicChair",
  //   },
  // ],
  height: "calc(100vh - 200px)",
  contentHeight: "auto",
  nowIndicator: false,

  businessHours: {
    // days of week. an array of zero-based day of week integers (0=Sunday)
    daysOfWeek: [1, 2, 3, 4, 5], // Monday - Thursday

    startTime: "10:00", // a start time (10am in this example)
    endTime: "20:00", // an end time (6pm in this example)
  },
  slotMinTime: "10:00",
  slotMaxTime: "20:00",
  allDaySlot: false,
  expandRows: true,
  eventOverlap: false,
  lazyFetching: false,
  eventTimeFormat: {
    hour: "2-digit", //2-digit, numeric
    minute: "2-digit", //2-digit, numeric
    //second: "2-digit", //2-digit, numeric
    meridiem: false, //lowercase, short, narrow, false (display of AM/PM)
    hour12: false, //true, false
  },
  views: {
    week: {
      titleFormat: {
        weekday: "short",
        month: "short",
        day: "numeric",
        omitCommas: true,
      },
    },
  },
  //events: eventSources,
  eventSources: [
    {
      url: "/api/calendar/" + user_id,
      method: "GET",
    },
  ],
  //timeFormat: "HH(:mm)",
  datesSet: (info) => {
    //console.log(eventSources);
    //eventSources = Object.assign([], []);
    //eventSources = weekEvents(info.start);
    //today.value = info.start;
    // console.log(eventSources);
    //fCalendar.value.removeAllEvents();
    //eventSources.forEach((event) => fCalendar.value.addEvent(event));
  },
};
const schedule = (arg) => {
  console.log(arg.event);
  //eventSources = weekEvents(new Date());
  //console.log(eventSources);
};

// watch(
//   today,
//   (newEvents) => {
//     console.log(fCalendar.value);
//     // Remove existing events
//     //    newEvents.forEach(event => calendar.value.addEvent(event)); // Add updated events
//   },
//   { deep: true }
// );
</script>

<style>
.fc .fc-timegrid-slot {
  border-bottom: 0px;
  height: calc(100vh / 25);
}
</style>

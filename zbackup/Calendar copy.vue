<template>
  <q-input
    outlined
    v-model="objectDate"
    lazy-rules
    :rules="[(val) => this.isValidDate(val) || 'Date format YYYY/MM/DD']"
    :label="propLabel"
    mask="date"
  >
    <template v-slot:append
      ><q-icon name="event" class="cursor-pointer" />
      <q-popup-proxy
        @before-show="updateCalendar"
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date
          v-model="baseDate"
          first-day-of-week="0"
          navigation-min-year-month="2022/10"
        >
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn
              label="Apply"
              color="primary"
              flat
              @click="saveCalendar"
              v-close-popup
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </template>
  </q-input>
</template>

<script>
import { date } from "quasar";
export default {
  props: {
    propDate: { Type: String, default: date.formatDate(Date(), "DD/MM/YYYY") },
    propLabel: { Type: String, default: "" },
    propHint: { Type: String, default: "" },
  },
  data() {
    return {
      objectDate: null,
      baseDate: null,
    };
  },
  methods: {
    isValidDate(d) {
      var x = date.extractDate(d, "YYYY/MM/DD");

      return date.isValid(x);
    },
    saveCalendar() {
      this.objectDate = date.formatDate(
        date.extractDate(this.baseDate, "YYYY/MM/DD"),
        "YYYY/MM/DD"
      );
      this.$emit("setDate", this.objectDate);
    },
    updateCalendar() {
      var x = date.extractDate(this.objectDate, "YYYY/MM/DD");
      this.baseDate = date.formatDate(x, "YYYY/MM/DD");
    },
    sDate: function (d) {
      return d >= date.formatDate(Date(), "YYYY/MM/DD");
    },
  },
  watch: {
    propDate: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.objectDate =
          newVal === ""
            ? date.formatDate(Date(), "YYYY/MM/DD")
            : date.formatDate(newVal, "YYYY/MM/DD");
        this.baseDate =
          newVal === ""
            ? date.formatDate(Date(), "YYYY/MM/DD")
            : date.formatDate(newVal, "YYYY/MM/DD");
      },
    },
  },
  computed: {},
};
</script>

<style></style>

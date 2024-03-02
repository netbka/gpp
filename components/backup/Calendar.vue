<template>
  <div>
    <label
      class="q-field row no-wrap items-start q-field--filled q-input q-field--float q-field--labeled"
      for="calendar_emp"
    >
      <div class="q-field__inner relative-position col self-stretch">
        <div class="q-field__control relative-position row no-wrap" tabindex="-1">
          <div
            class="q-field__control-container col relative-position row no-wrap q-anchor--skip"
          >
            <flat-pickr
              v-model="model"
              :config="config"
              class="q-field__native q-placeholder"
              id="calendar_emp"
              @on-change="valueUpdate"
            />

            <div class="q-field__label no-pointer-events absolute ellipsis">
              Medical career start
            </div>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>
<script setup>
import { date } from "quasar";
import flatPickr from "vue-flatpickr-component";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index.js";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/plugins/monthSelect/style.css";
//https://github.com/ankurk91/vue-flatpickr-component
const model = ref(null);

let newDate = new Date(2017, 2, 7);

newDate = date.subtractFromDate(newDate, { years: 30 });

const config = ref({
  maxDate: newDate,
  plugins: [
    new monthSelectPlugin({
      shorthand: true, //defaults to false
      dateFormat: "M y", //defaults to "F Y"
      altFormat: "F Y", //defaults to "F Y"
    }),
  ],
});

const valueUpdate = (val) => {
  // console.log(val);
};
</script>

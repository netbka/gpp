<template>
  <div class="bg-white">
    <draggable
      class="dragArea"
      tag="div"
      :list="data"
      :group="{ name: 'parent', pull: 'clone', put: false }"
    >
      <div v-for="el in data" :key="el.name" class="bgcolor q-my-xs q-pb-xs">
        <div class="bg-blue-3 q-pa-sm q-mb-sm shadow-2 row cursor-pointer">
          <div class="col-8 text-weight-bold text-uppercase self-center">
            <span v-show="el.active">
              <q-spinner-grid color="primary" size="1em" class="q-mr-sm" />
            </span>
            {{ el.name }}
          </div>
          <div class="col-3 text-right">
            <baseDurationInput
              v-model="el.repeats"
              :label="'повторы'"
            ></baseDurationInput>
            <!-- <q-input
              bg-color="white"
              dense
              v-model="el.repeats"
              style="width: 43px; padding: 0 !important"
              max="99"
              min="0"
              input-style="text-align: center; font-size:11px; margin-top: 6px !important; "
              step="1"
              class="super-small float-right"
              type="number"
              label="повторы"
            /> -->
          </div>
          <div class="col-1 self-center">
            <q-icon flat round dense name="drag_handle" class="float-right" />
          </div>
        </div>

        <draggable
          class="parentArea q-pb-xs cursor-pointer"
          tag="ul"
          :list="el.exercise"
          :group="{ name: 'exercise' }"
        >
          <div
            class="row q-pa-sm shadow-1 q-mx-md q-my-sm bg-blue-grey-1"
            v-for="el in el.exercise"
            :key="el.name"
          >
            <div class="col-9 col-sm-7">
              <span v-show="el.active">
                <q-spinner-rings color="primary" size="1em" class="q-mr-sm" />
              </span>
              <span class="text-weight-thin font12">{{ el.name }} </span>
            </div>
            <div class="col-2 col-sm-4 text-right">
              <baseDurationInput
                v-model="el.duration"
                :label="'сек.'"
              ></baseDurationInput>
              <!-- <q-input
                color="blue-grey-14"
                bg-color="white"
                dense
                v-model="el.duration"
                style="width: 43px; padding: 0 !important"
                max="600"
                min="0"
                input-style="text-align: center; font-size:11px; margin-top: 6px !important; "
                step="10"
                class="super-small float-right"
                type="number"
                label="сек."
              /> -->
            </div>
            <div class="col-1 self-center">
              <q-icon flat round dense name="drag_handle" class="float-right" />
            </div>
          </div>
        </draggable>
        <!-- <div class="row justify-center bg-orange-1 q-pa-sm q-mx-lg shadow-1">
          <div class="col-5 text-caption">Отдых</div>
          <div class="col-5">
            <q-input
              color="orange-14"
              bg-color="white"
              dense
              v-model="el.rest"
              style="width: 43px; padding: 0 !important"
              max="300"
              min="0"
              input-style="text-align: center; font-size:11px; margin-top: 6px !important; "
              step="10"
              class="super-small float-right"
              type="number"
              label="сек."
            />
          </div>
        </div> -->
        <!-- 
            <li v-for="el in el.exercise" :key="el.name">
            <p>{{ el.name }}</p>
          </li>
            
            <nested-draggable
          :group="{ name: 'child', pull: 'clone', put: true }"
          :data="el.exercise"
          class="bg-gray-100 pl-5 child"
          v-if="el.exercise"
          tag="div"
          component="child"
          @move="onSort"
        /> -->
      </div>
    </draggable>
  </div>
</template>
<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
  props: {
    data: {
      required: true,
      type: Array,
    },
  },
  // methods: {
  //   onSort(event) {
  //     console.log(event);
  //     const { from, removed, added } = event;

  //     //Check if the dragged item is trying to be dropped onto its parent
  //     //   if (added.parentNode === removed.parentNode) {
  //     //     // Invalid drop, prevent sorting (optional)
  //     //     event.detail.cancel();
  //     //   } else {
  //     //     // Other logic for valid sorting
  //     //   }
  //   },
  // },
  components: {
    draggable: VueDraggableNext,
  },
  name: "nested-draggable",
};
</script>
<style lang="scss">
.font12 {
  font-size: 12px !important;
}
ul {
  padding: 0 !important;
}
.dragArea {
  min-height: 50px;
  outline: 0.5px dashed;
  outline-color: #46474b42;
}
.super-small.q-field--dense {
  .q-field__control-container,
  .q-field__native {
    padding-top: 2px !important;
  }

  .q-field__control {
    height: 28px !important;
    min-height: 28px !important;
  }

  .q-field__marginal {
    height: 28px !important;
  }

  .q-field__label {
    top: 1px !important;
  }
}
.bgcolor {
  background-color: #10a4de0f;
}
</style>

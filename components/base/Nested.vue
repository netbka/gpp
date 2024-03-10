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
          <div class="col-grow text-weight-bold text-uppercase self-center">
            <span v-show="el.active">
              <q-spinner-grid color="purple" size="2em" class="q-mr-sm" />
            </span>
            {{ el.name }}
          </div>
          <div class="col-auto self-center">
            <BaseBtnNewDelete
              @onAdd="$emit('onAdd', el)"
              @onDelete="$emit('onDelete', el.id)"
            ></BaseBtnNewDelete>
          </div>
          <div class="col-auto text-right">
            <baseRepeatInput v-model="el.repeats" :label="'повторы'"></baseRepeatInput>
          </div>
          <div class="col-auto self-center">
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
            class="row q-pa-xs shadow-1 q-mx-md q-my-sm bg-blue-grey-1"
            v-for="el in el.exercise"
            :key="el.name"
          >
            <div class="col-grow">
              <span v-show="el.active">
                <q-spinner-rings color="purple" size="3em" class="q-mr-sm" />
              </span>
              <!-- <span class="text-weight-thin font12">{{ el.name }} </span> -->
              <BaseSelectExercise
                :data="el"
                :editable="el.id === 0 || el.id === null"
                @onUpdateExercise="onUpdateExercise"
              ></BaseSelectExercise>
            </div>
            <div class="col-auto text-right">
              <baseDurationInput
                v-model="el.duration"
                :label="'сек.'"
              ></baseDurationInput>
            </div>
            <div class="col-auto self-center">
              <q-icon flat round dense name="drag_handle" class="float-right" />
            </div>
          </div>
        </draggable>
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

  components: {
    draggable: VueDraggableNext,
  },
  name: "nested-draggable",

  setup(props, context) {
    const onUpdateExercise = (val) => {
      context.emit("onUpdateExercise", val);
    };
    return {
      onUpdateExercise,
    };
  },
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

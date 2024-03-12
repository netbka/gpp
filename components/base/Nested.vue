<template>
  <div class="bg-white">
    <draggable
      class="dragArea"
      tag="div"
      :list="data"
      :group="{ name: 'parent', pull: 'clone', put: false }"
      @onChoose="onChoose"
    >
      <div class="text-center" v-show="data.length === 0">Тут будет план тренировки.</div>
      <div v-for="el in data" :key="el.id" class="bgcolor q-pb-xs">
        <div class="bg-blue-3 q-pa-xs shadow-2 row cursor-pointer">
          <div class="col-grow text-weight-bold text-uppercase self-center width-65">
            <span v-show="el.active">
              <q-spinner-grid color="purple" size="2em" class="q-mr-sm" />
            </span>
            <BaseTextInput
              v-model="el.name"
              @updatedb="$emit('onUpdateGroup', 'name', el.name, el.id)"
            ></BaseTextInput>
          </div>
          <div class="col-auto self-center q-ms-xs">
            <BaseBtnNewDelete
              @onAdd="$emit('onAddExercise', el)"
              @onDelete="$emit('onDeleteGroup', el.id)"
              :propNewVisible="true"
            ></BaseBtnNewDelete>
          </div>
          <div class="col-auto text-right self-center q-mr-xs">
            <BaseNumberInput
              v-model="el.repeats"
              @updatedb="$emit('onUpdateGroup', 'repeats', Number(el.repeats), el.id)"
            ></BaseNumberInput>
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
            class="row q-pa-xs shadow-1 q-mx-md q-my-sm bg-blue-grey-1 no-wrap ellipsis"
            v-for="el in el.exercise"
            :key="el.name"
          >
            <div class="col-grow">
              <span v-show="el.active">
                <q-spinner-rings color="purple" size="3em" class="q-mr-sm" />
              </span>

              <BaseSelectExerciseTemplate
                :data="el"
                :editable="el.name === '' || el.name.length === 0"
                @onUpdateExercise="onUpdateExercise"
                @onDeleteExercise="onDeleteExercise"
              ></BaseSelectExerciseTemplate>
            </div>
            <div class="col-auto text-right">
              <BaseBtnNewDelete
                @onDelete="$emit('onDeleteExercise', el.id)"
              ></BaseBtnNewDelete>
            </div>
            <div class="col-auto text-right self-center q-mr-xs">
              <BaseNumberInput
                v-model="el.duration"
                :typeDuration="true"
                @updatedb="$emit('onUpdateExerciseField', 'duration', el.duration, el.id)"
              ></BaseNumberInput>
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
    const onUpdateExercise = (id, model) => {
      context.emit("onUpdateExercise", id, model);
    };
    const onDeleteExercise = (val) => {
      context.emit("onDeleteExercise", val);
    };
    const onChoose = (val) => {
      console.log(val);
    };
    return {
      onChoose,
      onUpdateExercise,
      onDeleteExercise,
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
    padding-top: 0 !important;
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

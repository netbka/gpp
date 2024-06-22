<template>
  <div class="bg-white">
    <q-scroll-area class="scroll-height" :bar-style="barStyle()">
      <draggable
        class="dragArea"
        tag="div"
        :list="data"
        :group="{ name: 'parent', pull: 'clone', put: false }"
        handle=".handle"
      >
        <div v-for="(el, index) in data" :key="el.id" class="shadow-sm bg-gray-50">
          <div class="bg-color q-pa-xs shadow-2 row cursor-pointer">
            <div class="col-grow text-weight-bold text-uppercase self-center width-65">
              <span v-show="el.active" class="" style="display: inline">
                <q-spinner-grid color="purple" size="1.6em" class="q-mr-sm" />
              </span>
              <InputText
                :readOnly="readOnly"
                v-model="el.name"
                @updatedb="$emit('onUpdateGroup', 'name', el.name, el.id)"
              ></InputText>
            </div>
            <div class="col-auto self-center q-ms-xs">
              <BaseBtnNewDelete
                :readOnly="readOnly"
                @onAdd="$emit('onAddExercise', el)"
                @onDelete="$emit('onDeleteGroup', el.id)"
                :propNewVisible="true"
              ></BaseBtnNewDelete>
            </div>
            <div class="col-auto text-right self-center q-mr-xs">
              <InputNumber
                :typeDuration="false"
                :readOnly="readOnly"
                v-model="el.repeats"
                @updatedb="$emit('onUpdateGroup', 'repeats', Number(el.repeats), el.id)"
              ></InputNumber>
            </div>
            <div class="col-auto self-center">
              <q-icon
                flat
                round
                dense
                name="drag_handle"
                class="float-right handle"
                size="md"
              />
            </div>
          </div>
          <BaseNestedChild
            :readOnly="readOnly"
            :data="el.exercise"
            @onDeleteExercise="onDeleteExercise"
            @onUpdateExercise="onUpdateExercise"
            @onAddCustomExercise="onAddCustomExercise"
            @onUpdateExerciseField="onUpdateExerciseField"
          ></BaseNestedChild>
        </div>
      </draggable>
    </q-scroll-area>
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
    readOnly: {
      default: false,
      type: Boolean,
    },
  },

  components: {
    draggable: VueDraggableNext,
  },
  name: "nested-draggable",

  setup(props, context) {
    onMounted(() => {});
    //console.log(props.readOnly);
    const onUpdateExercise = (id, model) => {
      context.emit("onUpdateExercise", id, model);
    };
    const onDeleteExercise = (val) => {
      context.emit("onDeleteExercise", val);
    };

    const onAddCustomExercise = (id, val) => {
      context.emit("onAddCustomExercise", id, val);
    };
    const onUpdateExerciseField = (field, val, id) => {
      context.emit("onUpdateExerciseField", field, val, id);
    };

    return {
      //onChoose,
      onAddCustomExercise,
      onUpdateExerciseField,
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
.bg-color {
  background-color: #deeeff;
  border: 1px #c1c0c0 solid;
}
</style>

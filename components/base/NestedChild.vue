<template>
  <div class="bg-grey-1">
    <draggable
      class="parentArea q-pb-xs cursor-pointer"
      tag="div"
      :list="data"
      :group="{ name: 'exercise' }"
      handle=".handle"
    >
      <div
        class="row q-pa-xs shadow-1 q-my-sm bg-color-nested no-wrap ellipsis"
        v-for="el in data"
        :key="el.id"
      >
        <div class="col-grow">
          <span v-show="el.active">
            <q-spinner-rings color="purple" size="3em" class="q-mr-sm" />
          </span>

          <InputSelectExerciseTemplate
            :readOnly="readOnly"
            :data="el"
            :editable="el.name === '' || el.name.length === 0"
            @onUpdateExercise="onUpdateExercise"
            @onDeleteExercise="onDeleteExercise"
            @onAddCustomExercise="onAddCustomExercise"
          ></InputSelectExerciseTemplate>
        </div>
        <div class="col-auto text-right">
          <BaseBtnNewDelete
            :readOnly="readOnly"
            @onDelete="$emit('onDeleteExercise', el.id)"
          ></BaseBtnNewDelete>
        </div>
        <div class="col-auto text-right self-center q-mr-xs">
          <InputNumber
            :readOnly="readOnly"
            v-model="el.duration"
            :typeDuration="true"
            @updatedb="$emit('onUpdateExerciseField', 'duration', el.duration, el.id)"
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
    </draggable>
  </div>
</template>
<script>
import { VueDraggableNext } from "vue-draggable-next";
export default {
  props: {
    data: {
      required: false,
      type: Array,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    draggable: VueDraggableNext,
  },
  //name: "nested-draggable",

  setup(props, context) {
    onMounted(() => {});
    const onUpdateExercise = (id, model) => {
      context.emit("onUpdateExercise", id, model);
    };
    const onDeleteExercise = (val) => {
      context.emit("onDeleteExercise", val);
    };
    const onAddCustomExercise = (id, val) => {
      context.emit("onAddCustomExercise", id, val);
    };

    return {
      onAddCustomExercise,
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
.bg-color-nested {
  background-color: #cccccc24;
  border: 1px #d0309d45 solid;
}
</style>

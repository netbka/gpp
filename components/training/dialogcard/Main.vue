<template>
  <q-dialog
    persistent
    full-height
    v-on:keyup.esc="hide"
    ref="dialog"
    class="no-padding counter-dialog"
  >
    <q-card class="bg-white text-white counter-card">
      <q-toolbar>
        <q-toolbar-title class="text-blue-7"> </q-toolbar-title>
        <q-btn dense flat icon="close" @click="hide" color="grey" class="" />
      </q-toolbar>

      <q-card-section class="fixed-center counter-card">
        <div class="text-center q-mb-lg" v-show="!showResult">
          <span class="text-light-blue-2 counter-size">
            {{ durationToTextCounter(counterDuration) }}
          </span>
          <!-- <q-knob
            show-value
            font-size="60px"
            class="q-ma-md"
            v-model="timer"
            size="60px"
            :thickness="0.05"
            color="white "
            track-color="white "
            readonly
          >
            
          </q-knob> -->
        </div>
        <TrainingDialogcardExercise v-show="!showResult"></TrainingDialogcardExercise>
        <TrainingDialogcardResult v-show="showResult"></TrainingDialogcardResult>
      </q-card-section>

      <q-card-section class="q-pt-none" v-show="!showResult"> </q-card-section>

      <q-card-section class="q-pt-none" v-show="showResult"> </q-card-section>
      <q-card-actions class="fixed-bottom">
        <slot name="actions"> </slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
const { counterDuration, showResult } = useTrainingExercise();

const store = useTrainingStore();

const emits = defineEmits(["hide"]);

const dialog = ref(null);

const hide = () => {
  store.isStarted = false;
  dialog.value.hide();
};

const show = () => {
  dialog.value.show();
};
defineExpose({
  show,
});
</script>

<style scoped>
/* .exercise-image {
  height: calc(100vh / 3);
  object-fit: scale-down;
  max-width: 1200px;
  width: -webkit-fill-available;
} */
.counter-size {
  font-size: 60px;
}
.padding {
  padding-left: calc((100vw - 1439px) / 2);
  padding-right: calc((100vw - 1439px) / 2);
}
.counter-card {
  max-width: 100vw !important;
  width: calc(100vw - 30px) !important;
}

@media (min-width: 760px) {
  .counter-card {
    min-width: 720x !important;
    max-width: 1200px !important;
    width: calc(100vw - 30px);
  }
}

.counter-dialog {
  width: 700px !important;
}

.position_knob {
  position: relative;
  left: 100px;
}
</style>

<template>
  <q-dialog
    persistent
    :full-height="propFullHeight"
    v-on:keyup.esc="hide()"
    ref="dialog"
    class="no-padding"
    :position="position"
    backdrop-filter="blur(2px)"
  >
    <div class="form-size">
      <q-form
        @reset="onReset"
        @keyup.ctrl.enter="onSubmit"
        @submit="onSubmit"
        ref="myForm"
        :class="[{ 'full-height': propFullHeight }]"
      >
        <q-card :class="['form-size', { 'full-height': propFullHeight }]">
          <q-card-section class="row q-pr-sm">
            <div class="text-h6">{{ propHeading }}</div>
            <q-space />
            <q-btn dense flat icon="close" @click="hide()" style="z-index: 9999" />
          </q-card-section>
          <q-separator />
          <q-card-section class="col q-pt-sm">
            <slot></slot>
          </q-card-section>
          <q-separator />
          <q-card-actions align="right" class="bg-white text-teal q-pr-sm">
            <BaseBtnSubmitNew
              :propSaveDisabled="props.propSaveDisabled"
              :propLoading="props.propLoading"
              :propDisabled="props.propDisabled"
              :propNewVisible="props.propNewVisible"
              @newItem="$emit('newItem')"
            ></BaseBtnSubmitNew>
          </q-card-actions>
          <q-inner-loading :showing="propLoading">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

const position = computed(() => {
  return $q.screen.gt.xs ? "standard" : "top";
});

const props = defineProps({
  propSaveDisabled: { type: Boolean, default: false },
  propHeading: { type: String, default: "" },
  propSubHeading: { type: String, default: "" },
  propFullWidth: { type: Boolean, default: false },
  propMinWidth: { type: Boolean, default: true },
  propFullHeight: { type: Boolean, default: false },
  propLoading: { type: Boolean, default: false },
  propResetVisible: { type: Boolean, default: true },
  propDisabled: { type: Boolean, default: false },
  propNewVisible: { type: Boolean, default: false },
});
const dialog = ref(null);
const emits = defineEmits(["onSubmit", "onReset", "newItem", "onHide"]);
const show = () => {
  dialog.value.show();
};
const hide = () => {
  dialog.value.hide();
  emits("onHide");
};

const onSubmit = () => {
  emits("onSubmit");
};
const onReset = () => {
  emits("onReset");
};
defineExpose({
  show,
});
</script>
<style>
.nooverflow {
  overflow: hidden;
}
.form-size {
  min-width: 300px !important;
  max-width: calc(100vw - 2px) !important;
  width: 100vw !important;
}
@media (min-width: 1500px) {
  .form-size {
    min-width: 1500px !important;
    max-width: 1500px !important;
    width: 1500px !important;
  }
}
</style>

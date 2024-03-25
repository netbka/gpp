<template>
  <q-dialog
    persistent
    :full-height="propFullHeight"
    ref="dialog"
    class="no-padding row"
    :position="position"
  >
    <q-card class="">
      <q-card-section class="row q-pr-sm">
        <div class="text-h6">{{ propHeading }}</div>
        <q-space />
        <q-btn dense flat icon="close" v-on:click="hide()" />
      </q-card-section>
      <q-separator />
      <q-card-section class="col q-pt-sm">
        <slot></slot>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right" class="bg-white text-teal q-pr-sm">
        <q-btn
          size="sm"
          outline
          color="secondary"
          @click="hide()"
          label="Закрыть"
        ></q-btn>
      </q-card-actions>
      <q-inner-loading :showing="propLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

const position = computed(() => {
  return $q.screen.gt.xs ? "standard" : "top";
});

const props = defineProps({
  propHeading: { type: String, default: "" },

  propFullHeight: { type: Boolean, default: false },
  propLoading: { type: Boolean, default: false },
});
const dialog = ref(null);
const emits = defineEmits(["onHide"]);
const show = () => {
  dialog.value.show();
};
const hide = () => {
  emits("onHide");
  dialog.value.hide();
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
  width: 100vw;
}
@media (min-width: 600px) {
  .form-size {
    min-width: 300px !important;
    max-width: calc(100vw - 2px) !important;
    width: calc(100vw 4 / 5);
  }
}

@media (min-width: 1000px) {
  .form-size {
    min-width: 300px !important;
    max-width: calc(100vw - 2px) !important;
    width: calc(100vw / 2);
  }
}
</style>

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
      <q-card :class="['bottom-border', { 'full-height': propFullHeight }]">
        <q-card-section class="row q-pr-sm">
          <div class="text-h6">{{ data.name }}</div>
          <q-space />
          <q-btn dense flat icon="close" @click="hide()" style="z-index: 9999" />
        </q-card-section>
        <q-separator />
        <q-card-section class="col q-pa-md bottom-border">
          <q-scroll-area class="scroll-content">
            <div v-html="data.description"></div>
          </q-scroll-area>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right" class="bg-white text-teal q-pr-sm">
          <q-btn outline color="primary" size="sm" class="float-right" @click="hide()">
            закрыть
          </q-btn>
        </q-card-actions>
      </q-card>
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
  propHeading: { type: String, default: "" },

  propFullHeight: { type: Boolean, default: true },
  propLoading: { type: Boolean, default: false },
});
const dialog = ref(null);
const emits = defineEmits(["onHide"]);
let data = reactive({});
const show = (template) => {
  data = reactive(template);

  dialog.value.show();
};
const hide = () => {
  dialog.value.hide();
  emits("onHide");
};

defineExpose({
  show,
});
</script>
<style scoped>
.nooverflow {
  overflow: hidden;
}
.scroll-content {
  height: calc(100vh - 152px);
}
/* @media (min-width: 768px) {
  .scroll-content {
    height: calc(100vh - 270px);
  }
} */

.form-size {
  min-width: 300px !important;
  max-width: calc(100vw - 40px) !important;
  width: 100vw !important;
}
@media (min-width: 1500px) {
  .form-size {
    min-width: 1500px !important;
    max-width: 1500px !important;
    width: 1500px !important;
  }
}
.bottom-border {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
</style>

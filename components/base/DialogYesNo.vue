<template>
  <div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card class="q-dialog-plugin" style="width: 600px">
        <q-card-section class="row">
          <div class="text-h6">{{ header }}</div>
          <q-space />
          <q-btn dense flat icon="close" v-on:click="hide()" />
        </q-card-section>
        <q-separator />
        <q-card-section class="col q-pt-sm">
          <div class="text-body2" v-html="body"></div>
          <div v-html="propDetails"></div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat :color="propCancelColor" :label="cancel" @click="onCancelClick" />
          <q-btn :color="propOkColor" :label="ok" @click="onOKClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const $t = useI18n().t;
const props = defineProps({
  propHeader: { type: String, default: "" },
  propVisible: { type: Boolean, default: false },
  propOkText: { type: String, default: "" },
  propOkColor: { type: String, default: "red" },
  propCancelColor: { type: String, default: "secondary" },
  propCancelText: { type: String, default: "" },
  propBody: {
    type: String,
    default: "",
  },
  propDetails: { type: String, default: "" },
});

const ok = computed(() => {
  return props.propOkText.length == 0
    ? $t("components.dialogyesno.propOkText")
    : props.propOkText;
});
const header = computed(() => {
  return props.propHeader.length == 0
    ? $t("components.dialogyesno.propHeader")
    : props.propHeader;
});
const body = computed(() => {
  return props.propBody.length == 0
    ? $t("components.dialogyesno.propBody")
    : props.propBody;
});
const cancel = computed(() => {
  return props.propCancelText.length == 0
    ? $t("components.dialogyesno.propCancelText")
    : props.propCancelText;
});
const dialog = ref(null);
const emits = defineEmits(["ok", "cancel"]);
const id = ref(0);
const show = (_id) => {
  id.value = _id;
  dialog.value.show();
};
const hide = () => {
  dialog.value.hide();
};

const onDialogHide = () => {
  //emits("hide");
};

const onOKClick = () => {
  emits("ok", id.value);
  dialog.value.hide();
};

const onCancelClick = () => {
  emits("cancel");
  dialog.value.hide();
};

defineExpose({
  show,
});
</script>

<style></style>

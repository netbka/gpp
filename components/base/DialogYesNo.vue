<template>
  <div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card class="q-dialog-plugin" style="width: 600px">
        <q-card-section class="row">
          <div class="text-h6">{{ propHeader }}</div>
          <q-space />
          <q-btn dense flat icon="close" v-on:click="hide()" />
        </q-card-section>
        <q-separator />
        <q-card-section class="col q-pt-sm">
          <div class="text-body2" v-html="propBody"></div>
          <div v-html="propDetails"></div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            flat
            :color="propCancelColor"
            :label="propCancelText"
            @click="onCancelClick"
          />
          <q-btn :color="propOkColor" :label="propOkText" @click="onOKClick" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  propHeader: { type: String, default: "Подтвердите действие" },
  propVisible: { type: Boolean, default: false },
  propOkText: { type: String, default: "Удалить" },
  propOkColor: { type: String, default: "red" },
  propCancelColor: { type: String, default: "secondary" },
  propCancelText: { type: String, default: "Отменить" },
  propBody: {
    type: String,
    default: "Данные будут удалены без возможности восстановления",
  },
  propDetails: { type: String, default: "" },
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

<template>
  <div>
    <q-btn
      class=""
      size="0.8em"
      flat
      dense
      round
      icon="add_circle"
      color="indigo-7"
      @click="$emit('onAdd')"
      v-show="props.propNewVisible && !props.readOnly"
    />
    <q-btn
      class=""
      size="0.8em"
      flat
      dense
      round
      icon="cancel"
      color="deep-orange-4"
      @click="confirmDelete()"
      v-show="!props.readOnly"
    />
    <BaseDialogYesNo ref="dialog" @ok="remove"></BaseDialogYesNo>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  propNewVisible: { type: Boolean, default: false },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const dialog = ref(null);
const confirmDelete = (id) => {
  dialog.value.show(id);
};
const remove = (id) => {
  emits("onDelete");
};
const emits = defineEmits(["onDelete", "onAdd"]);
</script>

<style></style>

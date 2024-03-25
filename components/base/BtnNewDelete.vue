<template>
  <div>
    <q-btn
      class=""
      size="0.8em"
      flat
      dense
      round
      icon="add_box"
      color="indigo-10"
      @click="$emit('onAdd')"
      v-show="props.propNewVisible"
    />
    <q-btn
      class=""
      size="0.8em"
      flat
      dense
      round
      icon="delete_forever"
      color="deep-orange-5"
      @click="confirmDelete()"
    />
    <BaseDialogYesNo ref="dialog" @ok="remove"></BaseDialogYesNo>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  propNewVisible: { type: Boolean, default: false },
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

<template>
  <div>
    <q-btn
      class=""
      size="0.8em"
      flat
      dense
      round
      icon="post_add"
      color="indigo-10"
      @click="$emit('onAdd')"
    />
    <q-btn
      class=""
      size="0.8em"
      flat
      dense
      round
      icon="delete"
      color="red-9"
      @click="confirmDelete()"
    />
    <BaseYesNoDialog ref="dialog" @ok="remove"></BaseYesNoDialog>
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
const emits = defineEmits(["onDelete"]);
</script>

<style></style>

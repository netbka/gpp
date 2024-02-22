<template>
  <q-editor
    v-model="internalVal"
    :dense="$q.screen.lt.sm"
    :toolbar="editorToolbar"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
    @update:model-value="$emit('update', internalVal)"
  />
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
const $q = useQuasar();
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
const { modelValue } = props;

let internalVal = ref(modelValue);

const editorToolbar = ref([
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: "only-icons",
      options: ["left", "center", "right", "justify"],
    },
  ],
  ["bold", "italic", "underline"],
  [
    {
      label: "Paragraph", // $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: "no-icons",
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "code"],
    },
    {
      label: "Font", // $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: "no-icons",
      options: ["size-1", "size-2", "size-3", "size-4", "size-5", "size-6", "size-7"],
    },
    "removeFormat",
  ],
]);
</script>

<style></style>

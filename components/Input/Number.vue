<template>
  <span v-show="visibleEdit">
    <q-input
      bg-color="white"
      dense
      :model-value="Number(modelValue)"
      style="min-width: 45px; padding: 0 !important"
      :max="max"
      :min="min"
      :step="step"
      type="number"
      input-style="text-align: center; font-size:12px; margin-top: 2px !important; "
      class="super-small float-right"
      @update:modelValue="(newValue) => $emit('update:modelValue', Number(newValue))"
      :rules="[(val) => validate(val)]"
    >
      <template v-slot:after>
        <q-icon size="xs" name="done" @click="save()" class="cursor-pointer" />
        <q-icon
          size="xs"
          name="clear"
          @click="changeVisibility()"
          class="cursor-pointer"
        />
      </template>
    </q-input>
  </span>
  <span
    v-show="!visibleEdit"
    :class="['text-weight-light inline', { 'border-edit': !readOnly }]"
    @click="changeVisibility"
  >
    {{ modelValue }} {{ label }}
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
    required: true,
  },
  typeDuration: {
    type: [Boolean],
    default: false,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
});
const visibleEdit = ref(false);

const max = props.typeDuration ? 300 : 100;
const min = props.typeDuration ? 10 : 1;
const step = props.typeDuration ? 5 : 1;
let label = props.typeDuration ? "сек" : "раз";
label = props.label.length > 0 ? props.label : label;
const emits = defineEmits(["update:modelValue", "updatedb"]);
const save = () => {
  if (props.modelValue < 1) return;
  visibleEdit.value = !visibleEdit.value;
  emits("updatedb");
};

const changeVisibility = () => {
  if (props.modelValue < 1 || props.readOnly) return;
  if (props.modelValue.length === 0) return;
  visibleEdit.value = !visibleEdit.value;
};
const validate = (val) => {
  if (val === null || !val || val < 1) return "";
};
</script>

<style></style>

<template>
  <span class="inline">
    <span v-show="visibleEdit">
      <q-input
        bg-color="white"
        dense
        :model-value="modelValue"
        style="width: 315px; padding: 0 !important; z-index: 9999"
        input-style="text-align: left; font-size:12px; "
        class="float-left"
        @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
      >
        <template v-slot:after>
          <q-icon size="sm" name="done" @click="save()" class="cursor-pointer" />
          <q-icon size="sm" name="clear" @click="cancel()" class="cursor-pointer" />
        </template>
      </q-input>
    </span>
    <span
      v-show="!visibleEdit"
      :class="['text-weight-light inline', { 'border-edit': !readOnly }]"
      @click="changeVisibility"
    >
      {{ modelValue }}
    </span>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: [String],
    default: "",
    required: true,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
});
const visibleEdit = ref(false);
const initValue = ref(props.modelValue);
const emits = defineEmits(["update:modelValue", "updatedb"]);

const cancel = () => {
  changeVisibility();
  emits("update:modelValue", initValue.value);
};

const changeVisibility = () => {
  if (props.readOnly) return;
  if (props.modelValue.length === 0) return;
  visibleEdit.value = !visibleEdit.value;
};

const save = () => {
  initValue.value = props.modelValue;

  visibleEdit.value = !visibleEdit.value;
  emits("updatedb");
};
</script>

<style scoped>
.inline {
  display: inline;
}
</style>

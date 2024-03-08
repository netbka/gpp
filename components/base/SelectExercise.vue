<template>
  <div>
    <span v-show="visibleEdit">
      <q-select
        bg-color="white"
        dense
        :model-value="Number(modelValue)"
        style="width: 300px; padding: 0 !important"
        input-style="text-align: center; font-size:12px; margin-top: 2px !important; "
        class="super-small float-right"
        @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
      >
        <template v-slot:after>
          <q-icon
            size="sm"
            name="done"
            @click="visibleEdit = !visibleEdit"
            class="cursor-pointer"
          />
        </template>
      </q-select>
    </span>
    <span
      v-show="!visibleEdit"
      class="border-edit text-weight-light"
      @click="visibleEdit = !visibleEdit"
    >
      {{ modelValue }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: 0,
    required: true,
  },
  editable: {
    type: Boolean,
    default: false,
  },
});

const visibleEdit = ref(false);
visibleEdit = props.editable;
//const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);
//const textProp = toRef(props, "modelValue");
</script>

<style></style>

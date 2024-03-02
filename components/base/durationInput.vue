<template>
  <div>
    <span v-show="visibleEdit">
      <q-input
        bg-color="white"
        dense
        :model-value="Number(modelValue)"
        style="width: 65px; padding: 0 !important"
        max="99"
        min="0"
        input-style="text-align: center; font-size:12px; margin-top: 2px !important; "
        step="1"
        class="super-small float-right"
        type="number"
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
      </q-input>
    </span>
    <span v-show="!visibleEdit">
      <q-chip square size="sm" color="">
        <q-avatar
          icon="edit"
          color="accent"
          text-color="white"
          @click="visibleEdit = !visibleEdit"
        />
        {{ props.label }} {{ modelValue }}
      </q-chip>
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
  label: {
    type: [String],
    default: "сек.",
    required: true,
  },
});
const visibleEdit = ref(false);
//const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);
//const textProp = toRef(props, "modelValue");
</script>

<style></style>

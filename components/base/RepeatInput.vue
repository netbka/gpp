<template>
  <div>
    <span v-show="visibleEdit">
      <q-input
        bg-color="white"
        dense
        :model-value="Number(modelValue)"
        style="width: 65px; padding: 0 !important"
        max="100"
        min="1"
        step="1"
        type="number"
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
      </q-input>
    </span>
    <span v-show="!visibleEdit">
      <q-chip square size="0.8em" color="" class="">
        <q-avatar
          icon="edit"
          color="deep-orange-13"
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

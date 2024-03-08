<template>
  <span>
    <span v-show="visibleEdit">
      <q-input
        bg-color="white"
        dense
        :model-value="modelValue"
        style="width: 315px; padding: 0 !important"
        input-style="text-align: left; font-size:12px; "
        class="float-left"
        @update:modelValue="(newValue) => $emit('update:modelValue', newValue)"
      >
        <template v-slot:after>
          <q-icon size="sm" name="done" @click="commit()" class="cursor-pointer" />
        </template>
      </q-input>
    </span>
    <span
      v-show="!visibleEdit"
      class="border-edit text-weight-light"
      @click="visibleEdit = !visibleEdit"
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
});
const visibleEdit = ref(false);

const emits = defineEmits(["update:modelValue", "updatedb"]);

const commit = () => {
  visibleEdit.value = !visibleEdit.value;
  emits("updatedb");
};
</script>

<style scoped></style>

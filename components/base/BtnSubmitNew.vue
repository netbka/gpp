<template>
  <div>
    <q-btn
      v-show="props.propNewVisible"
      :label="$t('components.base.btnsubmitnew.labelnew')"
      size="sm"
      color="accent"
      outline
      :loading="props.propLoading"
      class="width-150"
      :disable="props.propLoading"
      @click="$emit('newItem')"
    />
    <q-btn
      :label="$t('components.base.btnsubmitnew.labelsave')"
      size="sm"
      type="submit"
      color="secondary"
      outline
      :loading="props.propLoading"
      class="width-150 q-ml-md"
      :disable="props.propLoading"
    >
      <template v-slot:props.propLoading>
        <q-spinner-hourglass class="on-left" />
        Сохраняю...
      </template>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  propSaveDisabled: { type: Boolean, default: false },
  propLoading: { type: Boolean, default: false },
  propDisabled: { type: Boolean, default: false },
  propNewVisible: { type: Boolean, default: false },
});
//const emits = defineEmits(["newItem", "onReset"]);
</script>

<style></style>

<template>
  <q-td class="text-center">
    <q-btn
      :icon="propExecuteBtn.icon"
      v-if="propExecuteBtn.visible"
      outline
      color="blue"
      dense
      :label="propExecuteBtn.label"
      @click="$emit('executeItem')"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ propExecuteBtn.tooltip }}
      </q-tooltip>
    </q-btn>

    <q-btn
      dense
      round
      flat
      :color="propEditBtn.color"
      @click="$emit('editItem')"
      :icon="propEditBtn.icon"
      v-if="propEditBtn.visible"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ propEditBtn.tooltip }}
      </q-tooltip>
    </q-btn>

    <q-btn
      dense
      round
      flat
      color="grey"
      @click="$emit('customAction')"
      :icon="propCustomBtn.icon"
      v-if="propCustomBtn.visible"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ propCustomBtn.tooltip }}
      </q-tooltip>
    </q-btn>
    <q-btn
      dense
      round
      flat
      color="grey"
      @click="$emit('deleteItem')"
      :icon="propDeleteBtn.icon"
      v-if="propDeleteBtn.visible"
    >
      <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
        {{ propDeleteBtn.tooltip }}
      </q-tooltip>
    </q-btn>
  </q-td>
</template>

<script lang="ts" setup>
const emits = defineEmits(["executeItem", "editItem", "customAction", "deleteItem"]);
const props = defineProps({
  propExecuteBtn: {
    Type: Object,
    default: {
      icon: "play_circle_outline",
      tooltip: "Старт",
      visible: true,
      label: "",
    },
  },
  propEditBtn: {
    Type: Object,
    default: { icon: "icon", tooltip: "Edit", visible: false, color: "grey" },
  },
  propCustomBtn: {
    Type: Object,
    default: { icon: "", tooltip: "", visible: false, label: "" },
  },
  propDeleteBtn: {
    Type: Object,
    default: { icon: "delete", tooltip: "Delete", visible: false },
  },
});
</script>
